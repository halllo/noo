var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var RatingSchema = new Schema({
  
    name      : String
  , ups  	  : Number
  , downs  	  : Number
  
});

module.exports = mongoose.model('RatingModel', RatingSchema);