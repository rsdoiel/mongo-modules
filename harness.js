//
// A simple test harness to run groups of tests as a simple setInterval
// service.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under this Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
//
/*jslint devel: true, node: true, maxerr: 50, indent: 4,  vars: true, sloppy: true */
(function (global, setInterval) {
	var test_groups = [],
		running_tests = [],
		complete_called = false;
	
	// Push a test batch into harness
	var push = function (test) {
		if (test.callback === undefined) {
			throw "missing function definition.";
		}
		if (test.label === undefined) {
			throw "missing test label.";
		}
		test_groups.push(test);
	};
		
	var completed = function (label) {
		complete_called = true;
		var i = running_tests.indexOf(label);
		if (i >= 0) {
			running_tests[i] = "";
			console.log("\t\t" + label + " OK");
			return true;
		}
		return false;
	};
	
	var RunIt = function (module_name, test_delay) {
		var int_id;
				
		if (module_name === undefined) {
			module_name = "Untitle module tests";
		}
		if (test_delay === undefined) {
			test_delay = 1000;
		}
		console.log("Starting [" + module_name.trim() + "] ...");
		(function (module_name) {
			var group_test;
			group_test = test_groups.shift();
			while (group_test) {
				if (group_test &&
						typeof group_test.callback === "function" &&
						typeof group_test.label === "string") {
					console.log("\tStarting " + group_test.label + " ...");
					running_tests.push(group_test.label);
					group_test.callback();
					console.log("\t\t" + group_test.label + " called");
				} else {
					if (complete_called === false) {
						throw "harness.completed(label) never called by tests.";
					}
					if (running_tests.join("") !== "") {
						running_tests.forEach(function (item) {
							if (item.trim() !== "") {
								console.log("\t\t" + item +
									" incomplete!");
							}
						});
					}
					throw module_name.trim() + " Failed!";
				}
				group_test = test_groups.shift();
			}
			console.log(module_name.trim() + " Success!");
		}(module_name));
	};
		
	global.harness = {};
	global.harness.push = push;
	global.harness.RunIt = RunIt;

	try {
		exports.push = push;
		exports.RunIt = RunIt;
	} catch (err) {
		console.log("Running in browser.");
	}
}(this));
