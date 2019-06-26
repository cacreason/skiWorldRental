// Js Document
// Ski World Rental Management Item Model
// User model

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

// Item Schema
var itemSchema = new Schema({
	username: {
		type: String,
		unique:true
	},
	password: {
		type: String
	},
	fName: {
		type: String
	},
	lName: {
		type: String
	},
	street: {
		type: String
	},
	aptNum: {
		type: String
	},
	city: {
		type: String
	},
  state: {
		type: String
	},
	zip: {
		type: String
	},
	homePhone: {
		type: String
	},
	mobile: {
		type: String
	},
	email: {
		type: String
	},
	altEmail: {
		type: String
	},
  type: {
		type: String
	},
	birthday: {
		type: String
	},
	activity: [ String ]
});

var Item = module.exports = mongoose.model('items', itemSchema);


module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
