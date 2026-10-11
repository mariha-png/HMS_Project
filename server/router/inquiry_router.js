const express = require("express");
const router = express.Router();
const { createInquiry } = require("../controllers/inquiry_controller");

// Logic controller se aa rahi hai
router.post("/", createInquiry);

module.exports = router;