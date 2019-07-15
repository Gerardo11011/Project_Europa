const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webDB', {useNewUrlParser: true});
var db = mongoose.connection;
var article = require ('../models/article')

router.get('/:id', function (req, res, next){
  article.findById(req.params.id, function (err, article) {
    res.render('edit', {article: article})
    return;
  });
});

router.post('/:id', function (req, res, next){
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
});

router.delete('/:id', function (req, res, next) {
  let query= {_id:req.params.id}
  article.remove(query,function(err){
    if (err) {
      console.log(err);
    }
    else {
      res.send('Succes');
    }
  });
});

module.exports = router;
