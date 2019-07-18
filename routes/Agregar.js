const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article')
const funciones = require('../src/handler');


router.get('/', function (req, res, next) {
  res.render('Agregar', {title : 'Agregar', logeado: false})
});

router.post('/', function (req, res, next){
  funciones.agregarNoticia(req,res,next);
});


module.exports = router;
