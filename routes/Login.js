const express = require('express');
const router = express.Router();

let User = require ('../models/user');

router.get('/', function (req, res, next) {
  res.render('login', {title: 'login'})
});

router.get('/registrar', function (req, res){
  res.render('registrar');
});

module.exports = router;
