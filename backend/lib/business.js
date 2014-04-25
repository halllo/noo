var Ratings = require('./Ratings');

var mongodb = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/meetappprototype'
var ratings = new Ratings(mongodb);


var getRates = function(name) {
	return 'no rates for "' + name + '"';
}

var getAllRates = function() {
	return 'list of all reates, but no rates yes';
}

var rate = function(name) {
	return 'rated "' + name + '"';
}


module.exports.getRates = getRates;
module.exports.getAllRates = getAllRates;
module.exports.rate = rate;