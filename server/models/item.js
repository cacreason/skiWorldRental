// Js Document
// Ski World Rental Management Item Model
// User model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Item Schema - Parent
var itemSchema = new Schema({
	description: {
		type: String,
		unique:true
	},
	brand: {
		type: String
	},
	category: {
		type: String
	},
	price: {
		type: String
	},
	children: {
		type: Array
	}
});

//Item Schema - Child
var childItemSchema = new Schema({
	parent: {
		type: String
	},
	description: {
		type: String
	},
	color: {
		type: String
	},
	size: {
		type: String
	},
	qty: {
		type: Number
	},
	sku: {
		type: String
	},
	altSku: {
		type: String
	}
});

var Item = module.exports.item = mongoose.model('items', itemSchema);
var ChildItem = module.exports.childitem = mongoose.model('childitems', childItemSchema);


module.exports.createItem = function(newItem, callback){
	newItem.save(callback);
}

module.exports.createChildItem = function(newChildItem, callback){
	newChildItem.save(callback);
}

module.exports.findItemAndUpdate = function(id, update, callback){
	Item.findByIdAndUpdate(id, update, callback);
}

module.exports.getItemByDescription = function(description, callback){
	var query = {description: description};
	Item.findOne(query, callback);
}
