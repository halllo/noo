var mongoose = require('mongoose');

var Rating = require('./Rating')

module.exports = Ratings;

function Ratings(connection) {
  mongoose.connect(connection);
}

Ratings.prototype = {
  
  of: function(filter, callback) {
    Rating.find(filter, function ratingsFound(err, items) {
      callback(items);
    });
  },

  all: function(callback) {
    Rating.find(function ratingsFound(err, items) {
      callback(items);
    });
  },

  rateUp: function(name, callback) {
    Rating.findOneAndUpdate(
      { name: 'borne' }, 
      { $inc: { ups: 1 }}, 
      function ratingsUpdated(err, updated) {
        callback(updated));
      });
  }
  
}