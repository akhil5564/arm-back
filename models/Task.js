const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    progress: { type: Number, default: 0 },
    status: String,
    duration: String,
    start: String,
    end: String,
    type: {
      type: String,
      enum: ["current", "upcoming"],
      default: "current",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);