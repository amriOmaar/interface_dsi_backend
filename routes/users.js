var express = require('express');
var router = express.Router();
const User = require('../models/Users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/getAllUsers', async (req, res) => {
  const data = await User.find({});
  if (data)
    return res.status(200).json(data)
})



router.get('/getUser/:id', async (req, res) => {
  const { id } = req.params
  try {
    const u = await User.findById(id);

    if (u && id) {
      return res.status(200).json(u)
    }

  } catch (e) {
    console.log(e)
  }
})



router.post('/addUser', async(req, res) => {
  const { username, password, nom, prenom, role, poste } = req.body

  const hashedPassword = await bcrypt.hash(password, 10);
  const u = new User( {
    username,
    password: hashedPassword,
    nom,
    prenom,
    role,
    poste,

  } )
  u.save().then((data) => {
    res.status(200).send('USER à ete ajouter avec succees:' + username )
  }).catch((e) => {
    console.log(e);
  })
})


router.put('/updateUser/:id', async(req, res, next) => {
  const { username, password, nom, prenom, poste, role } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
  const u = new User({
    _id: req.params.id,
    username,
    password: hashedPassword,
    nom,
    prenom,
    role,
    poste,
  });
  User.updateOne({_id: req.params.id}, u).then(
    () => {
      res.status(201).json({
        message: 'User updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});




router.delete('/deleteUser/:id', async (req, res) => {
  const { id } = req.params
  const u = await User.findByIdAndDelete(id);
  if (u && id) {
    return res.status(200).json(u)
  }
})


router.post("/login", async(req, res)=>{
  let {username, password} = req.body;

  User.findOne({username: username}).then(
    (user)=>{
      let valid = bcrypt.compareSync(password, user.password);
      if(!valid){
        res.send('token error !!!');
      }else{
        let payload = {
          _id: user.id,
          username: user.username,
          nom: user.nom,
          prenom: user.prenom,
          role: user.role,
          poste: user.poste,
      }

        let token = jwt.sign(payload, '1234558555554422', {expiresIn: '2h'})
        res.send({mytoken: token})}
    }
  ).catch(
    err=>{res.send("erreur")}
  )

})


module.exports = router;

