var getRates = function(name) {
	return 'no rates for "' + name + '"';
}

var rate = function(name) {
	return 'rated "' + name + '"';
}


module.exports.getRates = getRates;
module.exports.rate = rate;