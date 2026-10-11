
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");


// --- REGISTER LOGIC ---
const register = async (req, res) => {
    try {
        const { username, useremail, userpnumber, userpassword, role } = req.body;
        
        const userExist = await User.findOne({ useremail });
        if (userExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // --- UPDATE YAHAN HAI ---
        const userCreated = await User.create({ 
            username, 
            useremail, 
            userpnumber, 
            userpassword, 
            role: role || "guest",
            
            isAdmin: role === "admin" ? true : false 
        });

        res.status(201).json({ 
            msg: "Registration Successful", 
            token: await userCreated.generatetoken(),
            userId: userCreated._id.toString() 
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

// --- LOGIN LOGIC (Same as before) ---
const login = async (req, res) => {
    try {
        const { useremail, userpassword } = req.body;
        const userExist = await User.findOne({ useremail });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(userpassword, userExist.userpassword);
        
        if (isMatch) {
            res.status(200).json({
                msg: "Login Successful",
                token: await userExist.generatetoken(),
                userId: userExist._id.toString(),
                username: userExist.username,
                user: {
                    role: userExist.role || "guest",
                    isAdmin: userExist.isAdmin || false 
                }
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

const usertokencheck = async (req, res) => {
    try {
        const userData = req.user; 
        return res.status(200).json({ userData });
    } catch (error) {
        console.error("Auth Check Error:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { register, login, usertokencheck };