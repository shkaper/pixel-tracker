var Pixel = require('./models/pixel');
var path = require('path');

module.exports = function (app) {

    // server routes ===========================================================

    // sample api route
    //app.get('/api/pixel', function (req, res) {
    //    // use mongoose to get all pixels in the database
    //
    //});

    app.route('/api/pixel')
        .get(function(req, res) {
            console.log(req.url);
            Pixel.find(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result); // return all nerds in JSON format
            });

        })
        .post(function(req, res) {
            console.log(req.url);
            console.log(JSON.stringify(req.method) + ': ' + JSON.stringify(req.body));
            var pixel = new Pixel();      // create a new instance of the Pixel model
            pixel.name = req.body.name;  // set the pixel name (comes from the request)

            // save the bear and check for errors
            pixel.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Pixel created!' });
            });
        })
        .put(function(req, res) {
            res.send('Update the book');
        });

    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    //app.get('/', function (req, res) {
    //    console.log(req.url);
    //    res.sendFile('index.html', {root: path.join(__dirname, '../app')}); // load our public/index.html file
    //});

};