const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },

  // Assign lead to an employee by employeeId
  employeeId: { type: String, required: true },

  // Lead status flow
  status: { 
    type: String, 
    enum: ["New", "Contacted", "Follow-up", "Won", "Lost"], 
    default: "New" 
  },

  // Notes about the lead
  notes: [{ 
    note: String, 
    createdAt: { type: Date, default: Date.now } 
  }],

  // Follow-up schedule
  followUps: [{ 
    date: Date, 
    description: String 
  }],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lead", leadSchema);

