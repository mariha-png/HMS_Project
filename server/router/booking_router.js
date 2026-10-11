const express = require("express");
const router = express.Router();
const { 
  createBooking, 
  getBookingById, 
  getAllBookings,
  getFinanceStats,
  getSystemHealth // ✅ Naya controller import kiya
} = require("../controllers/booking_controller");

const authMiddleware = require("../middlewares/user_auth_middleware"); 
const Booking = require("../models/booking_model"); 

// --- ROUTES ---

// 1. Dashboard Ledger ke liye
router.get("/all-bookings", getAllBookings); 

// 2. Finance Panel ke liye (Calculations) ✅
router.get("/admin/stats", getFinanceStats); 

// 3. System Health Panel ke liye 🚀
// Iska full URL hoga: http://localhost:5000/api/bookings/system/status
router.get("/system/status", getSystemHealth);

// 4. Nayi booking
router.post("/", authMiddleware, createBooking);

// 5. Single booking details (Invoice ke liye)
router.get("/:id", authMiddleware, getBookingById);

// 6. Checkout (Delete) Route
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking record not found" });
        }

        await Booking.findByIdAndDelete(id);
        
        res.status(200).json({ 
            success: true, 
            message: "Guest checked out and record removed successfully" 
        });
    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server Error during checkout", 
            error: error.message 
        });
    }
});

module.exports = router;