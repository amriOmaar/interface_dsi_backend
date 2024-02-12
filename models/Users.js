var mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: String,
    password: String,
    nom: String,
    prenom: String,
    role: String,
    poste: String,
  });
  
  
  module.exports=mongoose.model('user', user);