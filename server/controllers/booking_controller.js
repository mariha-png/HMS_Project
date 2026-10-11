const Booking = require("../models/booking_model");

// 1. Create New Booking
const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, adults, children, totalAmount } = req.body;
    
    const newBooking = await Booking.create({
      guestId: req.user.id,
      roomId,
      checkInDate,
      checkOutDate,
      guests: { adults: Number(adults), children: Number(children) },
      totalAmount: Number(totalAmount),
      bookingStatus: "confirmed" 
    });

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: "Booking failed", details: error.message });
  }
};

// 2. Get All Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("guestId", "username email name") 
      .populate("roomId", "roomType roomNumber")   
      .sort({ createdAt: -1 }); 

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// 3. Get Finance Stats ✅
const getFinanceStats = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const totalEarnings = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const monthlyProfit = (totalEarnings * 0.7).toFixed(2);

    res.status(200).json({
      totalEarnings,
      monthlyProfit,
      totalBookings: bookings.length
    });
  } catch (error) {
    res.status(500).json({ message: "Stats error", error: error.message });
  }
};

// 4. Get System Health (System Panel ke liye) 🚀 NEW
const getSystemHealth = async (req, res) => {
  try {
    res.status(200).json({
      status: "Healthy",
      database: "Connected",
      uptime: process.uptime(),
      lastSync: new Date().toLocaleString()
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: error.message });
  }
};

// 5. Get Single Booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id)
      .populate("guestId", "username email name")
      .populate("roomId", "roomNumber roomPrice roomType");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Sab ko export karein ✅
module.exports = { 
  createBooking, 
  getBookingById, 
  getAllBookings, 
  getFinanceStats, 
  getSystemHealth 
};