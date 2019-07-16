const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article')

router.get('/', function (req, res, next) {
  article.find({'tema': {$nin : ["Astronomy", "astronomy", "Astronomia", "astronomia","Math", "math", "Matematicas", "matematicas","physics", "Physics", "fisica", "Fisica"]}}, function (err, article){

    if(err){
       console.log(err);
    }
    else {
       res.render('variados', {title : 'Variados', logeado: false, articles: article});
    }
  });
});

router.get('/:id', function (req, res, next) {
  article.findById(req.params.id, function (err, article) {
    res.render('Article', {article: article})
    return;
  });
});


module.exports = router;
