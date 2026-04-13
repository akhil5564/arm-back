const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const noticeSchema = new mongoose.Schema({
  title: String,
  message: String,
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  recipients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ], // empty means send to all

  replies: [replySchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notice", noticeSchema);