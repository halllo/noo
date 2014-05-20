var Ratings = require('./Ratings');

module.exports = Business;

function Business(mongodb) {
	this.ratings = new Ratings(mongodb);
}

Business.prototype = {

	getRates: function(name, callback) {
		this.ratings.of(name, callback);
	},

	getAllRates: function(callback) {
		this.ratings.all(callback);
	},

	rate: function(name, rating, callback) {
		if (rating.upOrDown === 'up')
			this.ratings.rateUp(name, callback);
		else if (rating.upOrDown === 'down')
			this.ratings.rateDown(name, callback);
		else
			callback("not a valid rating");
	}

}