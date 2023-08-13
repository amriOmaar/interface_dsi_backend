var mongoose = require("mongoose");
const partie = new mongoose.Schema({
    nom: String,
    joueur_1: String,
    joueur_2: String,
    etat: {
        type: String,
        default: "en cours",
    },
  });
  
  
  module.exports=mongoose.model('Partie', partie);
  