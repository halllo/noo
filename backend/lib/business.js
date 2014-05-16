var Ratings = require('./Ratings');

module.exports = Business;

function Business(mongodb) {
	this.ratings = new Ratings(mongodb);
}

Business.prototype = {

	getRates: function(name) {
		return 'no rates for "' + name + '"';
	},

	getAllRates: function() {
		return 'list of all reates, but no rates yes';
	},

	rate: function(name, rating) {
		return rating.upOrDown + ' rated "' + name + '"';
	}

}