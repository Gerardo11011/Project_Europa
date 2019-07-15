let mongoose = require ('mongoose');
var Schema = mongoose.Schema;
let articleschema = new Schema({
  tema:{
    type: String,
    require: true
  },
  titulo:{
    type: String,
    require: true
  },
  autor:{
    type: String,
    require: true
  },
  cuerpo:{
    type: String,
    require: true
  },
  bibliografia:{
    type: String,
    require: true
  }
});


let article = module.exports = mongoose.model('article', articleschema, 'article');
