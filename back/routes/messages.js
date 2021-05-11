const express = require('express');
const {getUserData} = require("../controllers");
const router = express.Router();
const {getAllMessage} = require("../controllers");




router.get('/message', getAllMessage)
router.get('/inform', getUserData)
module.exports = router;
