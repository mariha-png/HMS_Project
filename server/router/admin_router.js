const express = require("express");
const router = express.Router();
const Booking = require("../models/booking_model");
const Feedback = require("../models/feedback_model"); 
const Room = require("../models/room_model");

// --- BOOKING MANAGEMENT --- (Pehle wala code sahi hai)
router.get("/all-bookings", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("guestId", "username email") 
            .populate("roomId", "roomType price")
            .sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Data fetch nahi ho saka", error: error.message });
    }
});

router.delete("/delete-booking/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: "Booking successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Delete error", error: error.message });
    }
});

router.patch("/update-status/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { bookingStatus } = req.body;
        const updated = await Booking.findByIdAndUpdate(id, { bookingStatus }, { new: true });
        if (bookingStatus === 'confirmed' && updated.roomId) {
            await Room.findByIdAndUpdate(updated.roomId, { status: 'occupied' });
        }
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Update fail", error: error.message });
    }
});

// --- FEEDBACK MANAGEMENT (FIXED & UPDATED) ---

// 1. Fetch all feedbacks
router.get("/feedbacks", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Feedback fetch fail", error: error.message });
    }
});

// 2. DELETE Feedback (Fixed Route Name to match Frontend)
router.delete("/feedbacks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Feedback.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Feedback not found" });
        res.status(200).json({ message: "Feedback permanently removed" });
    } catch (error) {
        res.status(500).json({ message: "Delete error", error: error.message });
    }
});

// 3. UPDATE/REPLY to Feedback (New Route for Edit Button)
router.patch("/feedbacks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { adminReply } = req.body; // Agar aap reply save karna chahti hain
        const updated = await Feedback.findByIdAndUpdate(
            id, 
            { adminReply: adminReply, isReviewed: true }, 
            { new: true }
        );
        res.status(200).json({ message: "Feedback updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Update error", error: error.message });
    }
});

module.exports = router;