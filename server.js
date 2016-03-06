// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var morgan = require('morgan');

// configuration ===========================================

// log every request to the console
app.use(morgan('dev'));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /dist/img will be /img for users
app.use(express.static(__dirname + '/dist'));

// routes ==================================================
require('./server/routes')(app); // configure our routes

// connect to db and start app ===============================================

var dbURI = process.env.MONGOLAB_URI || 'mongodb://localhost/pixels_temp';

mongoose.connect(dbURI);

mongoose.connection.once('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);

    // Initialize the app
    var server = app.listen(process.env.PORT || 3001, function () {
        var port = server.address().port;
        console.log("Magic happens on port " + port);
    });
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
    process.exit(1);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

mongoose.connection.on('reconnected', function () {
    console.log('Mongoose default connection re-established to ' + dbURI);
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// expose app
exports = module.exports = app;

