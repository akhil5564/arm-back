const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,

  businessType: String,
  businessName: String,

  employeeId: { type: String, required: true },

  status: {
    type: String,
    enum: ["New", "Contacted", "Follow-up", "Won", "Lost"],
    default: "New",
  },

  notes: [
    {
      note: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  followUps: [
    {
      date: Date,
      description: String,
    },
  ],

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lead", leadSchema);
