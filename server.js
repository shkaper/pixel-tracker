// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var morgan         = require('morgan');

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 3001;

// log every request to the console
app.use(morgan('dev'));

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
 mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /dist/img will be /img for users
app.use(express.static(__dirname + '/dist'));

// routes ==================================================
require('./server/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:3001
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;

