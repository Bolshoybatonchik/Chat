var express = require('express');
var router = express.Router();
const {registerUser, loginUser, changePassword} = require('../controllers')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/change', changePassword)

module.exports = router;
