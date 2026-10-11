// controller/membership_controller.js
const Membership = require("../models/Membership_model"); 

const applyMembership = async (req, res) => {
    try {
        const { name, email, tier, message } = req.body;
        
        // Data create karte waqt error handle karein
        const application = await Membership.create({ name, email, tier, message });
        
        return res.status(200).json({ 
            message: "Membership application sent successfully",
            data: application 
        });
    } catch (error) {
        console.error("Controller Error:", error); // Terminal mein check karein exact error kya hai
        return res.status(500).json({ 
            message: "Internal Server Error", 
            extraDetails: error.message 
        });
    }
};

module.exports = { applyMembership };