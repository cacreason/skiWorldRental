//Ski World Rental Management Application Routes
//routes.js
//05/29/18

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
var path = require('path');

function checkAuth(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true
        next();
    } else{
        res.redirect("/admin/login");
    }
}

router.get("/admin/checkauth", checkAuth, function(req, res, next) {
    res.sendStatus(200);
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  //res.sendFile(path.resolve('build/index.html'));
});

router.get('/admin',  checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/admin/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/admin/inventory', checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/admin/inventory/newitem', checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/admin/users', checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/admin/reservations', checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.get('/admin/settings', checkAuth, function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

router.post('/contact', function (req, res) {
  console.log(req.body);
  var name = req.body.name;
	var email = req.body.email;
	var phone = req.body.phone;
	var content = req.body.text;

	// Validation
	req.checkBody('name', 'First Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('phone', 'Username is required').notEmpty();
	req.checkBody('content', 'Contact message is required').notEmpty();

	var errors = req.validationErrors();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp-relay.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"TigerFOX Media 👻" <inquire@tigerfoxmedia.com>', // sender address
      to: 'inquire@tigerfoxmedia.com', // list of receivers
      subject: 'TFML Web Contact', // Subject line
      text: 'Hello world?', // plain text body
      html: '<h2>TigerFOX Media Lab Contact form: </h2> <p>Name: ' + name + '</p><p>Email: ' + email + '</p><p>Phone: ' + phone + '</p><p>Content: <br>' + content + '</p>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      res.send({express: "Thank You!  A member of our web development team will be in touch shortly!"});
  });
});

module.exports = router;
