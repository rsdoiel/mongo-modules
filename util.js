//
// Stub for NodeJS shell like util module.
//
var inspect = function (obj) {
	return obj.toSource();
};

exports.inspect = inspect;