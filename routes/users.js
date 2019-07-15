const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport = require('passport');
let Usuario = require ('../models/user');
var bodyParser = require( 'body-parser' );

router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'})
});

router.get('/registrar', function (req, res){
  res.render('registrar');
});

router.post('/registrar', function(req, res){

  req.checkBody('nombre','Nombre es requerido').notEmpty();
  req.checkBody('correo','Correo es obligatorio').notEmpty();
  req.checkBody('correo', 'El correo ingresado no es valido').isEmail();
  req.checkBody('contraseña','Contraseña es requerida').notEmpty();
  req.checkBody('contrarepe','Las contraseñas no coinciden').equals(req.body.contraseña);
  req.checkBody('username','El nombre de usuario es requerido').notEmpty();
  req.checkBody('role','El rol del usuario es requerido').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('registrar', {title : 'registrar', logeado: false, errors: errors})
  }
  else {
     let registrado = new Usuario({
        nombre: req.body.nombre,
        correo: req.body.correo,
        username: req.body.username,
        contraseña: req.body.contraseña,
        role: req.body.role
     });

     bcrypt.genSalt(10, function(err, salt){
       bcrypt.hash(registrado.contraseña, salt, function(err, hash){
         if (err) {
           console.log(err);
         }
         registrado.contraseña = hash;
         registrado.save(function(err){
           if (err) {
             console.log(err);
             return;
           }
           else {
             req.flash('success', 'Usted ha sido registrado');
             res.redirect('/users/login');
           }
         });
       });
     });
  }
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
