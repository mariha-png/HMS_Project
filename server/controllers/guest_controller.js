const Guest = require("../models/guest_model");


const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().sort({ checkInDate: -1 }); 
    if (!guests || guests.length === 0) {
      return res.status(200).json([]); 
    }
    res.status(200).json(guests);
  } catch (error) {
    console.error("Error in getAllGuests:", error);
    res.status(500).json({ message: "Atlas se data fetch nahi ho saka" });
  }
};


const addGuest = async (req, res) => {
  try {
    const { guestName, email, phone, roomNumber, checkInDate, totalAmount } = req.body;

    const newGuest = new Guest({
      guestName,
      email,
      phone,
      roomNumber,
      checkInDate,
      totalAmount,
      status: "Occupied"
    });

    const savedGuest = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    console.error("Error in addGuest:", error);
    res.status(400).json({ message: "Guest add karne mein masla aaya" });
  }
};


const checkOutGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGuest = await Guest.findByIdAndDelete(id);

    if (!deletedGuest) {
      return res.status(404).json({ message: "Guest nahi mila" });
    }

    res.status(200).json({ message: "Guest Checked Out Successfully" });
  } catch (error) {
    console.error("Error in checkOutGuest:", error);
    res.status(500).json({ message: "Checkout process fail ho gaya" });
  }
};

module.exports = { getAllGuests, addGuest, checkOutGuest };