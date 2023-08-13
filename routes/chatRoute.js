var express = require('express');
const { ajoutChat } = require('../controllers/chatController');
var router = express.Router();

router.post("/addChat", ajoutChat)

module.exports = router;