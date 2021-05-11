const express = require('express');
const router = express.Router();
const users = require('./users')
const inform = require('./messages')
const checkToken = require("../services/checkToken");


router.use('/protected', checkToken, inform)
router.use('/auth', users)
module.exports = router;
