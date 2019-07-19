const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const passport = require('passport');
let Usuario = require ('../models/user');
var bodyParser = require( 'body-parser' );
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article');

module.exports = {
  registrar: function(req,res) {
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
  },

  variadosquery: function(req,res,next){
    article.find({'tema': {$nin : ["Astronomy", "astronomy", "Astronomia", "astronomia","Math", "math", "Matematicas", "matematicas","physics", "Physics", "fisica", "Fisica"]}}, function (err, article){

      if(err){
         console.log(err);
      }
      else {
         res.render('variados', {title : 'Variados', logeado: false, articles: article});
      }
    });
  },

  queryID: function(req,res,next){
    article.findById(req.params.id, function (err, article) {
      res.render('Article', {article: article})
      return;
    });
  },

  agregarNoticia: function(req,res,next){
    req.checkBody('titulo','Title is required').notEmpty();
    req.checkBody('autor','Author is required').notEmpty();
    req.checkBody('cuerpo','Body is required').notEmpty();
    req.checkBody('bibliografia','Bibliography is required').notEmpty();
    req.checkBody('tema','theme is required').notEmpty();


     let errors = req.validationErrors();

     if(errors){
       res.render('Agregar', {title : 'Agregar', logeado: true, errors: errors})
     }
     else {
       let art = new article();
       art.titulo = req.body.titulo;
       art.tema = req.body.tema;
       art.autor = req.body.autor;
       art.cuerpo = req.body.cuerpo;
       art.bibliografia = req.body.bibliografia;

       art.save(function(err){
         if(err){
           console.log(err);
           return err;
         }
         else {
           req.flash('success','Articulo añadido');
           res.redirect('/');
         }
       });
    }
  },

  delete: function(req,res,next){
    let query= {_id:req.params.id}
    article.deleteOne(query,function(err){
      if (err) {
        console.log(err);
      }
      else {
        res.send('Succes');
      }
    });
  },

  editar: function(req,res,next){
    let art = {}
    art.titulo = req.body.titulo
    art.tema = req.body.tema
    art.autor = req.body.autor
    art.cuerpo = req.body.cuerpo
    art.bibliografia = req.body.bibliografia


    let query = {_id:req.params.id}

    article.update(query, art, function(err){
      if (err) {
        console.log(err);
        return;
      }
      else {
        res.redirect('/index')
      }
    });
  },

  sayHelloInEnglish: function(){
    return 'hello';
  }
};
