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
	harness = require("../harness"),
	test_name = "tests/harness_test.js";

if (module.filename) {
	test_name = path.basename(module.filename);
}


var inNode = function () {
	var t = false;
	try {
		t = (process !== undefined);
	} catch (err) {
	}
	return t;
};

var inBrowser = function () {
	var t = false;
	try {
		t = (window !== undefined);
	} catch (err) {
	}
	return t;
};

var inMongo = function () {
	var t = false;
	if (inBrowser() === false &&
			inNode() === false) {
		t = true;
	}
	return t;
};

console.log("Welcome, we're testing " + test_name);
console.log("First tests will be completed with out calling RunIt()");
console.log("\tDoing some pre-RunIt() tests of methods.");
assert.ok(harness, "Should have a harness object");
assert.strictEqual(typeof harness.push, "function", "Should have a push method");
assert.strictEqual(typeof harness.completed, "function", "Should have a a completed method");
assert.strictEqual(typeof harness.RunIt, "function", "Should have a a RunIt method");
assert.strictEqual(typeof harness.platform, "string", "Should have a platform string");
assert.strictEqual(harness.counts("tests"), 0, "Should have zero tests defined.");
assert.strictEqual(harness.counts("running"), 0, "Should have zero tests running");

harness.push({callback: function (test_label) {
	assert.strictEqual(harness.counts("running"), 1, "Should have on test running for 'Testing push()'");
	// Now complete the test.
	harness.completed(test_label);
}, label: "Testing push()"});
assert.strictEqual(harness.counts("tests"), 1, "Should have one test group defined now.");
console.log("Pre-RunIt() tests, OK");
console.log("\tNow you should see output from RunIt()");

//Now let's create a test group we can skip
harness.push({callback: function (test_label) {
	assert.ok(false, "This assert should never get run.");
	harness.completed(test_label);
}, label: "SkippedThis()", targets: ["Not Supported Target"]});

//Now let create a test group with a supported target
harness.push({callback: function (test_label) {
	assert.equal(inNode(), true,
		"We're in Node");
	assert.equal(inMongo(), false,
		"We're not in Mongo");
	assert.equal(inBrowser(), false,
		"We're not in a browser");
	harness.completed(test_label);
}, label: "NodeOnly()", targets: ["node"]});

//Now let create a test group with a supported target
harness.push({callback: function (test_label) {
	assert.equal(inNode(), false,
		"We're not in Node");
	assert.equal(inMongo(), true,
		"We're in Mongo");
	assert.equal(inBrowser(), false,
		"We're not in a browser");
	harness.completed(test_label);
}, label: "MongoOnly()", targets: ["mongo"]});

//Now let create a test group with a supported target
harness.push({callback: function (test_label) {
	assert.equal(inNode(), false,
		"We're not in Node");
	assert.equal(inMongo(), false,
		"We're not in Mongo");
	assert.equal(inBrowser(), true,
		"We're in a browser");
	harness.completed(test_label);
}, label: "BrowserOnly()", targets: ["browser"]});

//Now let create a test group with a supported target
harness.push({callback: function (test_label) {
	assert.ok(true, "This assert should get run.");
	harness.completed(test_label);
}, label: "IncludeThis()", targets: ["mongo", "node", "browser"]});

harness.push({callback: function (test_label) {
assert.equal(harness.skipped(), 3,
	"Should have one skipped test. " +
	harness.skipped());
	harness.completed(test_label);
}, label: "SkipCount()"});
harness.RunIt(test_name, 10);
