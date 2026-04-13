
const mongoose = require("mongoose");

const BroadcastSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Company Announcement",
    },
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Broadcast", BroadcastSchema);


