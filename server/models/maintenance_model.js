const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  roomId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Room', 
    required: true 
  },
  // PDF Requirement: Task description aur status [cite: 56]
  taskDescription: { type: String, required: true },
  
  // Konse staff ko assign kiya gaya hai
  assignedStaffId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  
  maintenanceStatus: { 
    type: String, 
    enum: ['reported', 'in-progress', 'completed'], 
    default: 'reported' 
  },
  
  urgency: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'low' 
  }

}, { timestamps: true });

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);
module.exports = Maintenance;