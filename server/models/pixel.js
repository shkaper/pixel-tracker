var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pixels_temp');

var Schema = mongoose.Schema;

 var PixelSchema = new Schema({
     name : String
 });

module.exports = mongoose.model('Pixel', PixelSchema);