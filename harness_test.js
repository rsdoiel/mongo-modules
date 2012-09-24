//
// Test running harness from Mongo Shell
//
var threw_error = false;

assert = require("assert");
harness = require("harness");

harness.push({callback: function () {
	console.log("Testing push...");
}, label: "Testing push"});

threw_error = false;
try {
	harness.RunIt("Testing RunIt()");
} catch (err2) {
	threw_error = true;
	console.error(err2);
}
assert.equal(threw_error, false, "Should not throw an error on harness.RunIt()");
