//
// A few tests to see if harness_test.js is working under NodeJS
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
	harness = require("../harness");

console.log("Welcome, we're testing " + path.basename(module.filename));
console.log("First tests will be completed with out calling RunIt()");
console.log("\tDoing some pre-RunIt() tests of methods.");
assert.ok(harness, "Should have a harness object");
assert.strictEqual(typeof harness.push, "function", "Should have a push method");
assert.strictEqual(typeof harness.completed, "function", "Should have a a completed method");
assert.strictEqual(typeof harness.RunIt, "function", "Should have a a RunIt method");

assert.strictEqual(harness.counts("tests"), 0, "Should have zero tests defined.");
assert.strictEqual(harness.counts("running"), 0, "Should have zero tests running");

harness.push({callback: function () {
	assert.strictEqual(harness.counts("running"), 1, "Should have on test running for 'Testing push()'");
	// Now complete the test.
	harness.completed("Testing push()");
}, label: "Testing push()"});
assert.strictEqual(harness.counts("tests"), 1, "Should have one test group defined now.");
console.log("Pre-RunIt() tests, OK");
console.log("\tNow you should see output from RunIt()");

harness.RunIt(path.basename(module.filename), 10);
