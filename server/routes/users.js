// JavaScript Document
// Creason Media Portfolio User
// 5/26/17

var express = require('express');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var User = require('../models/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
		console.log('invalid user');
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
			console.log('invalid pword');
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

router.post('/login',
  passport.authenticate('local', { successRedirect: '/portal',
                                   failureRedirect: '/login',
                                   failureFlash: 'Invalid Username or Password' }),
  function(req, res) {
    res.redirect('/portal');
  }
);

router.post('/register', function(req, res){
	var fName = req.body.fName;
	var lName = req.body.lName;
	var email = req.body.email;
	var username = req.body.uName;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('fName', 'First Name is required').notEmpty();
	req.checkBody('lName', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('uName', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		console.log(fName + ' ' + username + '\n' + errors);
		res.status(400);
		res.send(errors);
    	//return;
	} else {
		var newUser = new User({
			Fname: fName,
			Lname: lName,
			email: email,
			username: username,
			password: password
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
module.exports = router;
