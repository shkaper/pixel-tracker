var path = require('path');
var Pixel = require('./models/pixel');

function getPixels(query, res) {
    Pixel.find(query, function (err, pixels) {
        if (err) {
            res.send(err);
        } else {
            res.json(pixels);
        }
    })
}

module.exports = function (app) {

    // server routes ===========================================================

    app.route('/api/pixel')
        .get(function (req, res) {
            getPixels({}, res);

        })
        .post(function (req, res) {
            var pixel = new Pixel();      // create a new instance of the Pixel model
            pixel.name = req.body.name;  // set the pixel name (comes from the request)

            // save the pixel and check for errors
            pixel.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({message: 'Pixel created!'});
                }
            });
        });

    app.route('/api/pixel/:name')
        .get(function (req, res) {
            getPixels({name: req.params.name}, res);
        });

    app.route('/t/:id')
        .get(function (req, res) {
            var image = new Buffer('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAgEAAMEBAA7', 'base64');
            Pixel.findOne({_id: req.params.id}, function (err, pixel) {
                if (err) {
                    res.send(err);
                } else if (pixel === null) {
                    res.sendStatus(404);
                } else {
                    res.type('gif');
                    res.send(image);
                    pixel.req_count += 1;
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