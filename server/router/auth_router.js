const express = require("express");
const router = express.Router();

// 1. Check karein middleware file ka name sahi hai (underscore vs dash)
const authMiddleware = require("../middlewares/user_auth_middleware");

// 2. Controller functions import (Names wahi rakhein jo controller mein hain)
const { 
    register,     // 'userregister' ko 'register' kar diya kyunki controller mein yahi tha
    login, 
    usertokencheck 
} = require("../controllers/auth_controller");

// --- PUBLIC ROUTES ---
router.route("/register").post(register); // 'userregister' ki jagah 'register'
router.route("/login").post(login);

// --- PROTECTED ROUTE ---
router.route("/user").get(authMiddleware, usertokencheck);

module.exports = router;