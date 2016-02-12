var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var PixelSchema = new Schema({
    name: String,
    req_count: {type: Number, default: 0}
}, {
    timestamps: { createdAt: 'created_at' }
});

module.exports = mongoose.model('Pixel', PixelSchema);
