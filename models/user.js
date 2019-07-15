let mongoose = require ('mongoose');
var Schema = mongoose.Schema;

let userSchema = new Schema({
  nombre:{
    type: String,
    required: true
  },
  correo:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  contraseña:{
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true
  }
});

let user = module.exports = mongoose.model('user', userSchema);
