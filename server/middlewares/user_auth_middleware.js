const jwt = require('jsonwebtoken');
const User = require('../models/user_model');

const authmiddleware = async (req, res, next) => {
  const webtoken = req.header('Authorization'); 

  if (!webtoken) {
    return res.status(401).json({ msg: 'Unauthorized HTTP, Token not Provided' });
  }

  const token = webtoken.replace('Bearer', '').trim();

  try {
    // 1. Verify using the correct key from .env
    const isVerified = jwt.verify(token, process.env.JWT_SECRET_KEY); 

    // 2. Find user (excluding password)
    const userData = await User.findOne({ useremail: isVerified.email }).select({ 
        userpassword: 0 
    }); 

    if (!userData) {
        return res.status(401).json({ msg: 'User not found' });
    }

    req.user = userData; 
    req.gettoken = token;
    req.userID = userData._id;
    
    next(); 

  } catch (error) {
    return res.status(401).json({ msg: 'Unauthorized, Invalid Token' });
  }
}

module.exports = authmiddleware;