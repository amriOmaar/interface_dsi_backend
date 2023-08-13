const Partie = require("../models/Partie");

const ajoutPartie = (req, res) => {
  const { nom, joueur_1, joueur_2, etat } =
    req.body;
  const newPartie = new Partie({
    nom,
    joueur_1,
    joueur_2,
    etat,
  });

  newPartie
    .save()
    .then(() => {
      res.status(200).json({
        newPartie,
      });
    })
    .catch((err) => console.log(err));
};


const ajoutPartieView = (req, res) => {
    res.render("addPartie");
  };



module.exports = {
    ajoutPartie,
    ajoutPartieView
};