var mongoose = require('mongoose');

var Rating = require('./Rating')

module.exports = Ratings;

function Ratings(connection) {
  mongoose.connect(connection);
}

Ratings.prototype = {
  
  of: function(name, callback) {
    Rating.find(
      { name: name },
      function ratingsFound(err, items) {
        callback(err, items);
      });
  },

  all: function(callback) {
    Rating.find(function ratingsFound(err, items) {
      callback(err, items);
    });
  },

  rateUp: function(name, callback) {
    Rating.findOneAndUpdate(
      { name: name }, 
      { $inc: { ups: 1 }}, 
      { upsert: true },
      function ratingsUpdated(err, updated) {
        callback(err, updated);
      });
  },

  rateDown: function(name, callback) {
    Rating.findOneAndUpdate(
      { name: name }, 
      { $inc: { downs: 1 }},
      { upsert: true },
      function ratingsUpdated(err, updated) {
        callback(err, updated);
      });
  }
  
}