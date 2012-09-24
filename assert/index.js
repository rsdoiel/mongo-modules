// assert-js - Add basic node assert like methods for use in the browser.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2011 all rights reserved
//
// Released under the Simplified BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
//
/*jslint browser: true, sloppy: false, indent: 4, maxlen: 80 */

// Mongo Shell provides a very limited assert function. Let's
// add to it.


// Make an assert fail
exports.fail = function (msg) {
	console.error(msg);
	return false;
};

// Make an OK assertion
exports.ok = function (expr, msg) {
	if (expr) {
		return true;
	}
	console.error(msg);
	return false;
};

// Make an equal assertion
exports.equal = function (expr1, expr2, msg) {
	/*jslint eqeq: true */
	if (expr1 == expr2) {
		return true;
	}
	/*jslint eqeq: false */
	console.error(msg);
	return false;
};

// Make an notEqual assertion
exports.notEqual = function (expr1, expr2, msg) {
	/*jslint eqeq: true */
	if (expr1 != expr2) {
		return true;
	}
	/*jslint eqeq: false */
	console.error(msg);
	return false;
};

// Make an strictEqual assertion
exports.strictEqual = function (expr1, expr2, msg) {
	if (expr1 === expr2) {
		return true;
	}
	console.error(msg);
	return false;
};

// Make an strictNotEqual assertion
exports.strictNotEqual = function (expr1, expr2, msg) {
	if (expr1 !== expr2) {
		return true;
	}
	console.error(msg);
	return false;
};
