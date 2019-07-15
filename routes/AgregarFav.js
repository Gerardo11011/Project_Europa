const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article');
var favorit = require ('../models/favoritos');
const path = require('path');



router.get('/', function (req, res, next) {
  res.render('agregarFav', {title : 'Agregar', logeado: false})
});

router.post('/', function (req, res, next){
  req.checkBody('usuarioID','Usuario ID es requerido').notEmpty();
  req.checkBody('articleID','Articulo ID es requerido').notEmpty();



   let errors = req.validationErrors();

   if(errors){
     res.render('agregarFav', {title : 'Añadir favoritos', logeado: false, errors: errors})
   }
   else {
     let favo = new favorit();
     favo.usuarioID = req.body.usuarioID;
     favo.articleID = req.body.articleID;

     favo.save(function(err){
       if(err){
         console.log(err);
         return;
       }
       else {
         req.flash('success','Añadido a favoritos');
         res.redirect('/');
       }
     });
  }
});


module.exports = router;
