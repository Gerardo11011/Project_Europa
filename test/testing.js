var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var mongoose = require('mongoose');
const config = require('../config/database');
const funciones = require('../src/handler');
var article = require ('../models/article');
let Usuario = require ('../models/user');

mongoose.Promise = global.Promise;

  describe('MyObject', function () {
    before('connect', function(){
            mongoose.connect(config.database, { useNewUrlParser: true });
        });

    describe ('App', function(){
      it('app deberia de retornar hello', function(){
        assert.equal(funciones.sayHelloInEnglish(), 'hello');
      });
    });

    describe ('registrar', function(){
      it('se deberia de registrar un usuario', function(){
        var registrado = new Usuario({
           nombre: 'Gerardo',
           correo: 'gerardoapg97@gmail.com',
           username: 'temporal',
           contraseña: 'contra',
           role: 'admin '
         });

         registrado.save().then(function(){
           assert(registrado.isNew === false);
         });
      })
    });

    describe ('registrar', function(){
      it('se deberia de registrar un usuario', function(){
        var registrado = new Usuario({
           nombre: 'Gerardo',
           correo: 'gerardoapg97@gmail.com',
           username: 'temporal',
           role: 'admin '
         });

         registrado.save().then(function(err){
           if (err) done(err);
           else {
             assert(registrado.isNew === false);
           }

         });
      })
  })


});
