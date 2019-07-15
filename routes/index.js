const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var art = require ('../models/article')

router.get('/', function (req, res, next) {
  art.find({}, function (err, art){

    if(err){
       console.log(err);
    }
    else {
       res.render('index', {title : 'index', logeado: false, article: art});
    }
  });
});

module.exports = router;
