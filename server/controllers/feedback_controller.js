const Feedback = require("../models/feedback_model");

const submitFeedback = async (req, res) => {
  try {
    const { username, rating, comment } = req.body;
    const feedbackCreated = await Feedback.create({ username, rating, comment });
    res.status(200).json({ message: "Feedback saved", data: feedbackCreated });
  } catch (error) {
    res.status(500).json({ message: "Backend error", error: error.message });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

module.exports = { submitFeedback, getAllFeedbacks };