var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var RequestSchema = new Schema({
        _pixel: {type: Schema.Types.ObjectId, ref: 'Pixel'},
        clientIp: String,
        clientHeaders: String,
        timestamp: Date
    }
);

var PixelSchema = new Schema({
        name: {type: String},
        req_count: {type: Number, default: 0},
        requests: [{type: Schema.Types.ObjectId, ref: 'Request'}]
    }, {
        timestamps: {createdAt: 'created_at'}
    }
);

module.exports = {
    Pixel: mongoose.model('Pixel', PixelSchema),
    Request: mongoose.model('Request', RequestSchema)
};
