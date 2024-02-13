const express = require('express');
const updateUserDetails = require('../../controllers/auth/updateUserDetails');

const router = express.Router();

router.put('/update_user_details/:userId', updateUserDetails);

module.exports = router;
