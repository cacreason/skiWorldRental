// JavaScript Document
// Ski World Rental Management Application Entry point
// Server file
// 5/29/19
var express = require('express');
var routes = require(__dirname + '/server/routes/routes');
var users = require(__dirname + '/server/routes/users');
var items = require(__dirname + '/server/routes/inventory');
require('dotenv').config();
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var path = require('path');
var flash = require('connect-flash');
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:' + process.env.DB_HOST + '/skiWorldRentalApp', {useNewUrlParser: true}).catch(err=>{console.log(err)});
var db = mongoose.connection;;

// Init App
var app = express();
// Connect Flash
app.use(flash());
app.use(cookieParser());

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/', users);
//  Start static file server
app.use(express.static(path.join(__dirname, 'build')));

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, function(){
	console.log("Web Server running at " + process.env.SERVER_IP + ":" + process.env.SERVER_PORT);
});
