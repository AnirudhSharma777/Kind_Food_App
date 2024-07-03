const express = require('express');
const router = express.Router();
const {Login} = require('../controller/Auth/Login');
const {Signup} = require('../controller/Auth/Signup');

router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;