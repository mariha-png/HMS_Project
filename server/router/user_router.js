const express = require('express');
const authcontroller = require('../controllers/auth_controller');
const userauthmiddleware = require('../middlewares/user_auth_middleware');
const router = express.Router();

// --- 1. REGISTRATION ROUTES ---
// PDF Requirement: Staff aur Guest profiles create karne ke liye [cite: 43, 44]
router.route('/register').get(authcontroller.userregister);
router.route('/register').post(authcontroller.userregister);

// --- 2. LOGIN ROUTES ---
// PDF Requirement: Secure login/logout mechanism [cite: 62]
router.route('/login').get(authcontroller.login);
router.route('/login').post(authcontroller.login);

// --- 3. USER DATA / PROFILE CHECK ---
// PDF Requirement: Role-based access control (RBAC) aur profile management [cite: 62, 77]
// Isme 'userauthmiddleware' check karega ke token valid hai ya nahi
router.route('/user').get(userauthmiddleware, authcontroller.usertokencheck);

module.exports = router;