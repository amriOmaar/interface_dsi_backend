var express = require('express');
const { ajoutJoueur, getJoueurs, getJoueurById, deleteJoueur, attaque } = require('../controllers/joueurController');
const { ajoutPartie, ajoutPartieView } = require('../controllers/partieController');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/newjoueur", ajoutJoueur)
router.get("/getalljoueur", getJoueurs)
router.get("/getJoueur/:id", getJoueurById)
router.delete("/deleteJoueur/:id", deleteJoueur)
router.post("/attaque", attaque)


router.post("/newpartie", ajoutPartie)
router.get("/newpartie", ajoutPartieView)



module.exports = router;

