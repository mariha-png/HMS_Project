const Booking = require("../models/Booking");


const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("guestId", "username email")
            .populate("roomId", "roomType price");
            
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const getFinanceStats = async (req, res) => {
    try {
        const bookings = await Booking.find();
        
        const totalEarnings = bookings.reduce((sum, booking) => {
            return sum + (Number(booking.totalAmount) || 0);
        }, 0);


        const monthlyProfit = (totalEarnings * 0.7).toFixed(2);

        res.status(200).json({
            totalEarnings,
            monthlyProfit,
            totalBookings: bookings.length
        });
    } catch (error) {
        res.status(500).json({ message: "Finance Stats Error", error: error.message });
    }
};

module.exports = { getAllBookings, getFinanceStats };