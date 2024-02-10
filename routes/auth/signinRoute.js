const express = require('express');
const handleLogin = require('../../controllers/auth/signinController');

const router = express.Router();

router.post('/signin', handleLogin);

module.exports = router;
