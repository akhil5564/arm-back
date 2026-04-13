const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// ✅ SEND MESSAGE
router.post("/", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const chat = new Chat({ sender, receiver, message });
    await chat.save();

    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET CHATS BETWEEN TWO USERS
router.get("/:userId/:otherUserId", async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;

    const chats = await Chat.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE MESSAGE
router.delete("/:id", async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE MESSAGE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Chat.findByIdAndUpdate(
      req.params.id,
      { message: req.body.message },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;