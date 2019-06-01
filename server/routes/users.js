// JavaScript Document
// Creason Media Portfolio User
// 5/26/17

var express = require('express');
var expressValidator = require('express-validator');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) {return done(err); }
   	if(!user) {
      console.log('invalid user');
   		return  done(null, false);
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		}
      else {
        console.log('Invalid Password');
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/admin/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      res.status(401);
      return res.send({message: "Invalid Username or Password"});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log("success user " + user.username + " authenticated" );
      res.redirect('/admin/');
    });
  })(req, res, next);
});

router.post('/admin/register', function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
  var fName = req.body.fName;
  var lName = req.body.lName;
  var street = req.body.street;
  var aptNum = req.body.aptNum;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var homePhone = req.body.homePhone;
  var mobile = req.body.mobile;
  var email = req.body.email;
  var altEmail = req.body.altEmail;
  var type = req.body.type;
  var birthday = req.body.birthday;

	// Validation
	req.checkBody('fName', 'First Name is required').notEmpty();
	req.checkBody('lName', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		console.log(fName + ' ' + username + '\n' + errors);
		res.status(400);
		res.send(errors);
	} else {
		var newUser = new User({
      username: username,
    	password: password,
    	fName: fName,
    	lName: lName,
    	street: street,
    	aptNum: aptNum,
    	city: city,
      state: state,
    	zip: zip,
    	homePhone: homePhone,
    	mobile: mobile,
    	email: email,
    	altEmail: altEmail,
      type: type,
    	birthday: birthday,
    	activity: []
		});
		User.getUserByUsername(username, function(err, user){
			if(err) throw err;
			if(!user){
				User.createUser(newUser, function(err, user){
					if(err) throw err;
					console.log(user);
					res.send({express: "User account created - Log In!"});
				});
			}
			else{
				res.status(400);
				res.send({express: "Username already exists"});
				console.log('username already taken');
			}
		});

	}
});

router.get('/admin/logout', function(req, res){
  console.log(req.user.username + " Logged Out.");
  req.logout();
  res.redirect('/admin/login');
});
module.exports = router;
