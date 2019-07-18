const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article')
const funciones = require('../src/handler');

router.get('/', function (req, res, next) {
  funciones.variadosquery(req,res,next);
});

router.get('/:id', function (req, res, next) {
  funciones.queryID(req,res,next);
});


module.exports = router;
