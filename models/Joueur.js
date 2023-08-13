var mongoose = require("mongoose");
const joueur = new mongoose.Schema({
    pseudo: String,
    sante: {
        type: Number,
        default: 100,
    },
    score: {
        type: Number,
        default: 0,
    },
  });
  
  
  module.exports=mongoose.model('joueur', joueur);

 