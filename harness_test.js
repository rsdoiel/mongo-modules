//
// A few tests to see if harness_test.js is working under Mongo's shell (2.2)
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under this Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
//
/*jslint devel: true, node: true, maxerr: 50, indent: 4,  vars: true, sloppy: true */
var path = require("path"),
	assert = require("assert"),
	harness = require("harness"),
	filename = "harness_test.js";

harness.push({callback: function () {
	assert.strictEqual(harness.counts("running"), 1, "Should have on test running for 'Testing push()'");
	// Now complete the test.
	harness.completed("Testing push()");
}, label: "Testing push()"});
assert.strictEqual(harness.counts("tests"), 1, "Should have one test group defined now.");

harness.RunIt(path.basename(filename));
