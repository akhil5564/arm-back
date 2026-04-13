const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

  employeeId: {
    type: String,
    required: true,
  },

  employeeName: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  fromDate: {
    type: Date,
    required: true,
  },

  toDate: {
    type: Date,
    required: true,
  },

  reason: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  remarks: {
    type: String,
    default: "",
  },
leaveLetter: {
  type: String,
  default: "", // ✅ make it required (recommended)
},
  approvedBy: {
    type: String,
    default: "",
  },

}, { timestamps: true });

module.exports = mongoose.model("Leave", leaveSchema);
