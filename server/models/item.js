// Js Document
// Ski World Rental Management Item Model
// User model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Item Schema - Parent
var itemSchema = new Schema({
	description: {
		type: String,
		unique: true,
		required: true
	},
	brand: {
		type: String,
		sparse: true
	},
	category: {
		type: String,
		sparse: true
	},
	price: {
		type: Number,
		sparse: true
	},
	children: {
		type: Array,
		sparse: true
	}
}, {autoIndex: false});

//Item Schema - Child
var childItemSchema = new Schema({
	parent: {
		type: String,
		required: true
	},
	description: {
		type: String,
		unique: true,
		required: true
	},
	color: {
		type: String,
		sparse: true
	},
	size: {
		type: String,
		sparse: true
	},
	qty: {
		type: Number,
		sparse: true
	},
	sku: {
		type: String,
		sparse: true
	},
	altSku: {
		type: String,
		sparse: true
	},
	category: {
		type: String,
		sparse: true
	},
	price: {
		type: Number,
		sparse: true
	}
}, {autoIndex: false});

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

module.exports.getChildItemByDescription = function(description, callback){
	let regex = new RegExp(description, 'gi');
	var query = {description: regex};
	ChildItem.find(query, callback);
}

module.exports.getChildItemByParentId = function(parentid, callback){
	let query = {parent: parentid};
	ChildItem.find(query, callback);
}
