var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var RatingSchema = new Schema({
  
    name      : String
  , rates  	  : Number
  
});

module.exports = mongoose.model('RatingModel', RatingSchema);