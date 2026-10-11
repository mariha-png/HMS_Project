const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Guest ID (User Model se link)
  guestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Room ID (Room Model se link)
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  
  // Frontend se guests ka data handle karne ke liye
  guests: {
    adults: { type: Number, default: 2 },
    children: { type: Number, default: 0 }
  },

  // Document Requirement: Automated procedure for room allocation and status
  bookingStatus: { 
    type: String, 
    enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'], 
    default: 'confirmed' // LuxuryStay ke liye default 'confirmed' rakhna behtar hai jab payment logic na ho
  },
  
  // Billing Snapshot (Document Requirement: Financial Record)
  totalAmount: { type: Number, required: true },

  // Tracking for the admin dashboard
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  }

}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;