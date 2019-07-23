// JavaScript Document
// Ski World Rental inventory Routes
// 6/22/19

var express = require('express');
var { check, validationResult } = require('express-validator/check');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var Item = require('../models/item');

router.post('/admin/inventory/getitems', function(req, res){
  const query = req.body.parent ? req.body.parent : "";
  const sanitizedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '');
  console.log(sanitizedQuery);
  Item.getChildItemByParentId(sanitizedQuery, function(err, item){
    if(err) throw err;
    if(item){
      console.log("Item Search: " + item);
      res.json(item);
    }
    else{
      res.status(409);
      res.send({express: "Item doesn't exist"});
    }
  });
});

router.post('/admin/inventory/search', function(req, res){
  const query = req.body.search? req.body.search : "";
  const sanitizedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '');
  console.log(sanitizedQuery);
  Item.getChildItemByDescription(sanitizedQuery, function(err, item){
    if(err) throw err;
    console.log("Item Search: " + item);
    res.json(item);
  });
});

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
      qty: item.matrix[i].qty,
      sku: item.matrix[i].sku,
      altsku: item.matrix[i].altSku,
      description: item.description + " " + item.matrix[i].color + " " + item.matrix[i].size,
      category: item.category,
      price: item.price
    });
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
          if(err) throw err;
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

module.exports = router;
