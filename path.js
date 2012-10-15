//
// path.js - A path manipulation module for Mongo's shell.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under the Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
/*jslint devel: true, node: true, maxerr: 50, indent: 4, vars: true, sloppy: true */

var delimiter = '/';

var normalize = function (resolving_path) {
	var i = 0,
		j = 0,
		reduced_path = "";
	
	resolving_path = resolving_path.replace(/\/.\/|\/\//g, '/');
	while (resolving_path.indexOf("/..") >= 0 &&
				resolving_path.length > 0) {
		i = resolving_path.indexOf("/..");
		if (i == 0) {
			resolving_path = resolving_path.substr(3);
		} else if (i > 0) {
			reduced_path = resolving_path.substr(0, i);
			// pop the last directory off
			j = reduced_path.lastIndexOf(this.delimiter);
			if (j >= 0) {
				reduced_path = reduced_path.substr(0, j);
				resolving_path = 
					reduced_path.concat(resolving_path.substr(i + 3));
			}
		}
	}
	return resolving_path;
};

var join = function () {
	var parts = [], i;
	
	for (i = 0; i < arguments.length; i += 1) {
		parts.push(arguments[i].trim());
	}
	return this.normalize(parts.join(this.delimiter));
};

var basename = function (file_path) {
	var filename;
	if (!file_path) {
		return "";
	}
	if (file_path.trim() === "" ||
			file_path.trim() === "/") {
		return "";
	} else if (file_path.lastIndexOf(this.delimiter) >= 0) {
		filename = file_path.substr(file_path.lastIndexOf(this.delimiter) + 1);
	} else {
		filename = file_path;
	}
	return filename;
};

var dirname = function (file_path) {
	var filename = this.basename(file_path);
	
	if (file_path.trim() === "" ||
			file_path.trim() === "./" ||
			file_path.indexOf(this.delimiter) < 0) {
		return ".";
	} else if (file_path.indexOf(filename) > 0) {
		return file_path.substr(0,
			file_path.lastIndexOf(this.delimiter));
	}
	return file_path;
};

exports.delimiter = delimiter;
exports.normalize = normalize;
exports.join = join;
exports.basename = basename;
exports.dirname = dirname;
