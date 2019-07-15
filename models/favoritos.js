let mongoose = require ('mongoose');
var Schema = mongoose.Schema;

let favSchema = new Schema({
  usuarioID:{
    type: String,
    required: true
  },
  articleID:{
    type: String,
    required: true
  }
});

let fav = module.exports = mongoose.model('fav', favSchema);
