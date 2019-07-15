const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article');
var favorio = require ('../models/favoritos');

router.get('/', function (req, res, next) {
  favorio.find({}, function (err, art){
    if(err){
       console.log(err);
    }
    else {
       res.render('Favoritos', {title : 'Favorito', logeado: false, article: art});
    }
  });
});

router.get('/:id', function (req, res, next) {
  favorio.find({ usuarioID: req.params.id}, function (err, art) {
    console.log(req.params.id);
    if (err) {
      console.log(err);
    }
    else {
      res.render('Favoritos', { title: 'Favorito', logeado: false, article: art });
    }
  });
});


module.exports = router;
