const User = require('../models/user_model'); 
const bcrypt = require('bcryptjs');

// --- 1. REGISTRATION LOGIC ---
const userregister = async (req, res) => {
    try {
        // PDF Requirement: Guest aur Staff profiles ke liye roles zaroori hain [cite: 43, 44]
        const { name, mail, pnum, pass, role, address } = req.body;

        if (!name || !mail || !pnum || !pass) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        const UserExist = await User.findOne({ useremail: mail });
        if (UserExist) {
            return res.status(400).json({ msg: 'Email Already Exist' });
        }

        // PDF Requirement: Admin manage karega ke kisko kya role dena hai [cite: 42, 62]
        const userCreate = await User.create({
            username: name,
            useremail: mail,
            userpnumber: pnum,
            userpassword: pass,
            role: role || 'guest', // Default role 'guest' rakha gaya hai [cite: 44]
            address: address || ""
        });

        const token = await userCreate.generatetoken();

        return res.status(201).json({
            msg: "Registration Successful",
            username: userCreate.username,
            role: userCreate.role, // Frontend ko role batana zaroori hai dashboard redirect ke liye [cite: 42]
            token: token,
            userId: userCreate._id.toString()
        });

    } catch (error) {
        console.error("BACKEND REGISTRATION ERROR:", error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// --- 2. LOGIN LOGIC ---
const login = async (req, res) => {
    try {
        const { mail, pass } = req.body;
        const UserExist = await User.findOne({ useremail: mail });

        // PDF Requirement: Secure login mechanism [cite: 62, 76]
        if (!UserExist) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // PDF Requirement: Admin staff accounts deactivate kar sakta hai 
        if (!UserExist.isActive) {
            return res.status(403).json({ msg: "Your account is deactivated. Contact Admin." });
        }

        const isMatch = await bcrypt.compare(pass, UserExist.userpassword);

        if (isMatch) {
            return res.status(200).json({
                msg: "Login Successfully",
                username: UserExist.username,
                role: UserExist.role, // Role check kar ke dashboard dikhayenge [cite: 42]
                token: await UserExist.generatetoken(),
                userId: UserExist._id.toString()
            });
        } else {
            return res.status(401).json({ msg: "Invalid Email or Password" });
        }
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// --- 3. TOKEN CHECK LOGIC (Me/Profile) ---
const usertokencheck = async (req, res) => {
    try {
        // Auth middleware se user ka data milta hai
        const userData = req.user; 
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(`Error from the User Route ${error.message}`);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { userregister, login, usertokencheck };