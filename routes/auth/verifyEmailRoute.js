const express = require('express');
const verifyEmail = require('../../controllers/auth/verifyEmail');

const router = express.Router();

router.get('/verify-email/:token', verifyEmail);

module.exports = router;
