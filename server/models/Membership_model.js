const { Schema, model } = require("mongoose");

const membershipSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    tier: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const Membership = model("Membership", membershipSchema);
module.exports = Membership;