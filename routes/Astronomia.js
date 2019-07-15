const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article')

router.get('/', function (req, res, next) {
  article.find({'tema': {$in : ["Astronomy", "astronomy", "Astronomia", "astronomia"]}}, function (err, article){

    if(err){
       console.log(err);
    }
    else {
       res.render('Astronomia', {title : 'Astronomia', logeado: false, articles: article});
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
