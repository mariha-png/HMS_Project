const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    roomNumber: { type: String, required: true },
    checkInDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Checked In' } // Checked In, Checked Out
}, { timestamps: true });

module.exports = mongoose.model('Guest', guestSchema);