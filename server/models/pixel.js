var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var RequestSchema = new Schema({
        clientIp: String,
        clientHeaders: String,
        timestamp: Date
    }
);

var PixelSchema = new Schema({
        name: {type: String, default: 'pixel' + Date.now()},
        req_count: {type: Number, default: 0},
        requests: [RequestSchema]
    }, {
        timestamps: {createdAt: 'created_at'}
    }
);

module.exports = mongoose.model('Pixel', PixelSchema);
