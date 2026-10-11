const express = require("express");
const router = express.Router();
const Contact = require("../models/contact_model");

router.post("/", async (req, res, next) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "Inquiry saved successfully" });
  } catch (error) {
    next(error); // Ye aapke server.js ke error middleware par chala jayega
  }
});

module.exports = router;