const express = require("express");
const router = express.Router();
const AllowedLocation = require("../models/AllowedLocation");

// Add allowed location
router.post("/location", async (req, res) => {
  try {
    const { name, lat, lng, radius } = req.body;
    const loc = new AllowedLocation({ name, lat, lng, radius });
    await loc.save();
    res.json({ message: "Location added", loc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List locations
router.get("/locations", async (req, res) => {
  try {
    const locations = await AllowedLocation.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
