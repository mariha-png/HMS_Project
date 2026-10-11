const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    useremail: { type: String, required: true, unique: true },
    userpnumber: { type: String, required: true },
    userpassword: { type: String, required: true },
    // --- Admin Check Field [Zaruri Tabdeeli] ---
    isAdmin: { type: Boolean, default: false }, 
    role: { type: String, default: 'guest' }
}, { timestamps: true });

// PASSWORD HASHING
userSchema.pre('save', async function () {
    if (!this.isModified("userpassword")) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.userpassword = await bcrypt.hash(this.userpassword, salt);
    } catch (error) {
        throw error;
    }
});

// TOKEN GENERATION
userSchema.methods.generatetoken = async function () {
    try {
        return jwt.sign(
            { 
                userId: this._id.toString(), 
                email: this.useremail,
                isAdmin: this.isAdmin // Token mein bhi isAdmin add karna behtar hai
            },
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '30d' }
        );
    } catch (error) { 
        console.error("JWT Sign Error:", error); 
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;