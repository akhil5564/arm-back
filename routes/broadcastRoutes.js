
const express = require("express");
const router = express.Router();
const Broadcast = require("../models/Broadcast");

router.get("/", async (req, res) => {
  try {
    const broadcasts = await Broadcast.find().sort({ createdAt: -1 });
    res.json(broadcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, message, sender } = req.body;

    const newBroadcast = new Broadcast({
      title,
      message,
      sender,
    });

    const savedBroadcast = await newBroadcast.save();

    res.status(201).json(savedBroadcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;