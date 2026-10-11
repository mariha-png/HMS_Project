const Inquiry = require("../models/inquiry_model");

// Create New Inquiry
const createInquiry = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Sare fields zaruri hain!" });
    }

    const newInquiry = new Inquiry({ name, email, message });
    await newInquiry.save();
    
    res.status(201).json({ message: "Saved Successfully" });
  } catch (err) {
    next(err);
  }
};

// Export karein
module.exports = { createInquiry };