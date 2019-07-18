const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport = require('passport');
let Usuario = require ('../models/user');
var bodyParser = require( 'body-parser' );
const funciones = require('../src/handler');

router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'})
});

router.get('/registrar', function (req, res){
  res.render('registrar');
});

router.post('/registrar', function(req, res){
  funciones.registrar(req,res);
});


router.get('/login', function (req,res){
  res.render('login')
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
