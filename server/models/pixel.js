var mongoose = require('mongoose');

var Schema = mongoose.Schema;

 var PixelSchema = new Schema({
     name : String
 });

module.exports = mongoose.model('Pixel', PixelSchema);
