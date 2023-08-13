
const Joueur = require("../models/Joueur");

const ajoutJoueur = (req, res) => {
  const { pseudo, sante, score } =
    req.body;
  const newJoueur = new Joueur({
    pseudo,
    sante,
    score,
  });

  newJoueur
    .save()
    .then(() => {
      res.status(200).json({
        newJoueur,
      });
    })
    .catch((err) => console.log(err));
};


const getJoueurs = async (req, res) => {
  try {
    await Joueur.find({});
  } catch (error) {
    res.status(500).send("Error retrieving joueurs");
  }
};



const getJoueurById = (req, res) => {
    const id = req.params.id;
    Joueur.findById(id, (err, Joueur) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      }
  
      if (!Joueur) {
        res.status(404).json({
          message: "No Joueur found !",
        });
      } else {
        res.status(200).json({
            Joueur,
        });
      }
    });
  };


  const deleteJoueur = (req, res) => {
    const id = req.params.id;
    Joueur.findByIdAndRemove(id).then(()=>{
        res.status(200)
    });
  };



  const attaque = async (req, res) => {
    const idAttaquant = req.params.id;
    const idVictime = req.params.id;
    const attaquant = await Joueur.findById(idAttaquant);
    const victime = await Joueur.findById(idVictime);

    victime.sante-20 
    attaquant.score+10

    const att = await Joueur.findByIdAndUpdate(idAttaquant, { pseudo: att.pseudo, sante: att.sante, score: att.score+10 });
    const vic = await Joueur.findByIdAndUpdate(idVictime, { pseudo: vic.pseudo, sante: vic.sante-20, score: vic.score });


    return res.status(200).json({ att: { ...attaquant._doc }, vic: { ...victime._doc } })

  };

module.exports = {
    ajoutJoueur,
    getJoueurs,
    getJoueurById,
    attaque,
    deleteJoueur
};