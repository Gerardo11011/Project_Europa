var assert = require('chai').assert
const funciones = require('../src/handler');

describe ('App', function(){
  it('app deberia de retornar hello', function(){
    assert.equal(funciones.sayHelloInEnglish(), 'hello');
  });
});
