const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  // PDF Requirement: Room Inventory (Unique Room Number)
  roomNumber: { 
    type: String, 
    required: true, 
    unique: true 
  },

  // PDF Requirement: Room Types (Updated to match Frontend Dropdown)
  roomType: { 
    type: String, 
    required: true,
    // ✅ Maine yahan aapke frontend ke saare options add kar diye hain
    enum: ['Deluxe', 'Suite', 'Villa', 'Executive', 'Classic', 'Loft', 'Single', 'Double', 'Luxury'] 
  },

  // PDF Requirement: Pricing
  roomPrice: { 
    type: Number, 
    required: true 
  },

  // --- IMAGE UPLOAD FIELD ---
  roomImage: { 
    type: String, 
    default: "" 
  },

  // PDF Requirement: Room Status (Real-time updates)
  roomStatus: { 
    type: String, 
    required: true,
    enum: ['available', 'occupied', 'cleaning', 'maintenance', 'booked'], 
    default: 'available' 
  },

  // Extra details for Guest Experience
  description: { 
    type: String 
  },

  // Features like AC, Wifi, etc.
  amenities: [{ 
    type: String 
  }],

  // Last cleaned or updated time
  lastCleaned: { 
    type: Date, 
    default: Date.now 
  }

}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;