const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
{
  employeeId: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  checkIn: {
    time: Date,
    latitude: Number,
    longitude: Number,
  },

  checkOut: {
    time: Date,
    latitude: Number,
    longitude: Number,
  },

  status: {
    type: String,
    default: "Present",
  },
},
{ timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);