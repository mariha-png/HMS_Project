const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model("Feedback", feedbackSchema);
module.exports = Feedback;