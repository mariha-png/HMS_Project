const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membership_controller");

// ✅ Isay sirf "/" rakhein taake URL "http://localhost:5000/api/memberships" banay
router.route("/").post(membershipController.applyMembership);

module.exports = router;