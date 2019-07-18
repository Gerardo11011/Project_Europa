const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article')
const funciones = require('../src/handler');

router.get('/:id', function (req, res, next){
  article.findById(req.params.id, function (err, article) {
    res.render('edit', {article: article})
    return;
  });
});

router.post('/:id', function (req, res, next){
  funciones.editar(req,res,next);
});

router.delete('/:id', function (req, res, next) {
  funciones.delete(req,res,next);
});

module.exports = router;
