// JavaScript Document
// Ski World Rental inventory Routes
// 6/22/19

var express = require('express');
var expressValidator = require('express-validator');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var Item = require('../models/item');

router.post('/admin/inventory/newitem', function(req, res){
	let description = req.body.description;
	let brand = req.body.brand;
  let category = req.body.category;
  let price = req.body.price;
  let color = req.body.color;
  let size = req.body.size;


	// Validation
	req.checkBody('description', 'Description is required').notEmpty();
	req.checkBody('brand', 'Brand is required').notEmpty();
	req.checkBody('category', 'Category is required').notEmpty();
	req.checkBody('price', 'Price is required').notEmpty();
	req.checkBody('color', 'Color is required').notEmpty();
  req.checkBody('size', 'Size is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log(description + '\n' + errors);
		res.status(400);
		res.send(errors);
	} else {
		var newItem = new Item({
      description: description,
      brand: brand,
      category: category,
      price: price,
      color: color,
      size: size
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
