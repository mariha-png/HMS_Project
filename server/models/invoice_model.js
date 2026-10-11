const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  // PDF Requirement: Room rates aur additional services ka breakdown
  roomCharges: { type: Number, required: true },
  
  additionalServices: [{
    serviceName: String, // e.g., Food, Laundry [cite: 53]
    cost: Number
  }],
  
  taxAmount: { type: Number, default: 0 }, // System Settings se calculate hoga [cite: 67]
  grandTotal: { type: Number, required: true },
  
  paymentStatus: { 
    type: String, 
    enum: ['unpaid', 'paid'], 
    default: 'unpaid' 
  }

}, { timestamps: true });

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;