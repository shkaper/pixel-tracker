var path = require('path');
var Pixel = require('./models/pixel');

var image = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAgEAAMEBAA7', 'base64'); //1x1 transparent gif converted to base64

function getPixels(query, res) {
    Pixel.find(query, function (err, pixels) {
        if (err) {
            res.send(err);
        } else {
            res.json(pixels);
        }
    })
}

function getSinglePixel(query, res) {
    Pixel.findOne(query, function (err, pixel) {
        if (err) {
            res.send(err);
        } else {
            res.json(pixel);
        }
    });
}


module.exports = function (app) {

    // server routes ===========================================================

    app.route('/api/pixel')
        .get(function (req, res) {
            getPixels({}, res);

        })
        .post(function (req, res) {
            var pixel = new Pixel();      // create a new instance of the Pixel model
            console.log(req.body.name);
            if (req.body.name !== '') {
                pixel.name = req.body.name;  // set the pixel name (comes from the request)
            }

            // save the pixel and check for errors
            pixel.save(function (err, pixelRet) {
                if (err) {
                    res.send(err);
                } else {
                    getSinglePixel({_id: pixelRet._id}, res);
                }
            });
        });

    app.route('/api/pixel/:id')
        .get(function (req, res) {
            getSinglePixel({_id: req.params.id}, res);
        })
        .delete(function (req, res) {
            Pixel.findOne({_id: req.params.id}, function (err, pixel) {
                if (err) {
                    res.status(500).send(err);
                } else if (pixel === null) {
                    res.sendStatus(404);
                } else {
                    pixel.remove(function (err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.sendStatus(200);
                        }
                    });
                }
            });
        })
    ;

    app.route('/t/:id')
        .get(function (req, res) {
            var id = req.params.id;
            if (id.substring(id.length - 4) === '.gif') {
                id = id.slice(0, -4);
            }
            Pixel.findOne({_id: id}, function (err, pixel) {
                if (err && err.name !== 'CastError') {
                    res.status(500).send(err);
                } else if (pixel === null || (err && err.name === 'CastError')) {
                    res.sendStatus(404);
                } else {
                    res.type('gif');
                    res.send(image);
                    var date = new Date();
                    var request = {
                        clientIp: req.ip,
                        clientHeaders: JSON.stringify(req.headers),
                        timestamp: date.toDateString()
                    };

                    pixel.req_count += 1;
                    pixel.requests.push(request);
                    pixel.save(function (err) {
                        if (err) {
                            console.error(err);
                        }
                    });
                }
            })
        });

    // frontend routes =========================================================
    //app.get('/', function (req, res) {
    //    console.log(req.url);
    //    res.sendFile('index.html', {root: path.join(__dirname, '../app')}); // load our public/index.html file
    //});

};