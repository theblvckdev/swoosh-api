const express = require("express");
const handleNewUser = require("../../controllers/auth/registerController");

const router = express.Router();

router.post("/signup", handleNewUser);

module.exports = router;
