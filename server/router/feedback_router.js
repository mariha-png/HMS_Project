const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedback_model");

router.post("/submit", async (req, res, next) => {
  try {
    const { username, rating, comment } = req.body;
    await Feedback.create({ username, rating, comment });
    return res.status(200).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;