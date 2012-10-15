//
// mongo-modules.js - Provides a simple module system for Mongo's shell
// (at least until a real one is provided). It is inspired by NodeJS'
// module system but intended to be much more simplistic and less
// featurefull.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under the Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
/*jslint devel: true, node: true, maxerr: 50, indent: 4, vars: true, sloppy: true */
/*global ls, pwd, listFiles, hostname, cat,
removeFile, load, run, runProgram, print,
sleep, getMemInfo */

(function (globals) {

	// Bootstrap by loading the path's module.

	// Bootstrap with the path module first. Then define
	// everything else.
	if (globals.MONGO_MODULES === undefined) {
		throw "MONGO_MODULES is not defined, check your .mongorc.js file.";
	}
	
	// I've included Douglas Crockford's json_parse function in order 
	// to support proceessing of package.json files.
	//load("lib/json2.js");

	var log = function () {
		var i, output = [];
		for (i = 0; i < arguments.length; i += 1) {
			if (typeof arguments[i] === "string") {
				output.push(arguments[i]);
			} else if (arguments[i].toString !== undefined) {
				output.push(arguments[i].toString());
			} else {
				output.push(arguments[i].toSource());
			}
		}
		print(output.join(" "));
	};

	var error = function () {
		var i, output = [];
		for (i = 0; i < arguments.length; i += 1) {
			if (typeof arguments[i] === "string") {
				output.push(arguments[i]);
			} else if (arguments[i].toString !== undefined) {
				output.push(arguments[i].toString());
			} else {
				output.push(arguments[i].toSource());
			}
		}
		print("ERROR: " + output.join(" "));
	};

	// Shim for console.log(), console.error()
	var Console = function () {
		return {
			log: log,
			error: error
		};
	}, console = new Console();


	var fromPackage = function (dirname) {
		var package_name = dirname + "/package.json",
			index_js = dirname + "/index.js",
			files = ls(dirname),
			i;

		if (files.indexOf(index_js) > -1) {
			return files[files.indexOf(index_js)];
		}
		if (files.indexOf(package_name) > -1) {
			// FIXME: would load the				
			throw "Can't load from package.json because Mongo Shell is missing JSON object and eval.";
		}
		return false;
	};

	var findModule = function (module) {
		var MONGO_MODULES = globals.MONGO_MODULES,
			i,
			j,
			files = [],
			load_filename = module.concat(".js"),
			reFilename = new RegExp(load_filename + '$'),
			reDirname = new RegExp(module),
			module_name;
		
		for (i = 0; i < MONGO_MODULES.length; i += 1) {
			files = listFiles(MONGO_MODULES[i]);
			for (j = 0; j < files.length; j += 1) {
				if (files[j].isDirectory === false &&
						files[j].name.match(reFilename)) {
					module_name = files[j].name;
					i = MONGO_MODULES.length + 1;
					j = files.length + 1;
				} else if (files[j].isDirectory === true &&
						files[j].name.match(reDirname)) {
					module_name = fromPackage(files[j].name);
				}
			}
		}
		if (module_name === undefined || module_name === false) {
			throw "Cannot find module " + load_filename;
		}

		this.exports = {};
		load(module_name);
		return this.exports;
	};

	// Now that we have basic path methods, let's make a require
	// engine.
	var Require = function () {
		return findModule;
	}, require = new Require();

	globals.console = console;
	globals.require = require;
}(this));
