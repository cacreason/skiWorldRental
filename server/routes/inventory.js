// JavaScript Document
// Ski World Rental inventory Routes
// 6/22/19

var express = require('express');
var { check, validationResult } = require('express-validator/check');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var Item = require('../models/item');

router.post('/admin/inventory/newitem', function(req, res){
  let item = {
	  description: req.body.description,
	  brand: req.body.brand,
    category: req.body.category,
    price: req.body.price,
    matrix: req.body.matrix
  }
  let childItems = [];
  for(let i=0; i<item.matrix.length; i++){
    childItems.push({
      parent: '',
      color: item.matrix[i].color,
      size: item.matrix[i].size,
      qty: 0,
      sku: '',
      altsku: '',
      description: item.description + " " + item.matrix[i].color + " " + item.matrix[i].size
    })
  }

	// Validation
	check('item.description', 'Description is required').not().isEmpty();
	check('item.brand', 'Brand is required').not().isEmpty();
	check('item.category', 'Category is required').not().isEmpty();
	check('item.price', 'Price is required').not().isEmpty();
	check('item.matrix', 'Color and Size are required').not().isEmpty();

	const errors = validationResult(req);

	if(!errors.isEmpty()){
		console.log("expressValidator Errors: " + description + '\n' + errors.array());
    res.status(422).json({ errors: errors.array() });
    res.send();
	} else {
		var newItem = new Item.item(item);
    var newChildItem;
    console.log("log:38" + newItem);
		Item.getItemByDescription(item.description, function(err, item){
			if(err) throw err;
			if(!item){
				Item.createItem(newItem, function(err, item){
          console.log("log:43" + item);
          for(let i=0; i<childItems.length; i++){
            childItems[i].parent = newItem._id;
            newChildItem = new Item.childitem(childItems[i]);
            Item.createChildItem(newChildItem, function(err, item){
              if(err) throw err;
              let update = { $push: {"children": item._id} };
              Item.findItemAndUpdate(item.parent, update, function(err, item){
                console.log("Child Id appended to Parent array");
              });
              console.log("\x1b[32m", "Child-Item Successfully Created: \n" + item);
            });
          }
					if(err) throw err;
					console.log("\x1b[32m", "Item Successfully Created: \n" + item);
					res.send({express: "Item Successfully Created"});
				});
			}
			else{
        console.log('Item already exists.');
				res.status(409);
				res.send({express: "Item description already exists."});
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
