const express = require("express");
const router = express.Router();

const AdminLocation = require("../models/AdminLocation");


// ✅ SET LOCATION
router.post("/set", async (req, res) => {

  try {

    const { name, latitude, longitude, radius } = req.body;

    if (!latitude || !longitude || !radius) {
      return res.status(400).json({
        message: "Latitude, longitude and radius required"
      });
    }

    // delete old location
    await AdminLocation.deleteMany();

    // create new
    const location = new AdminLocation({
      name,
      latitude,
      longitude,
      radius,
    });

    await location.save();

    res.json({
      message: "Location saved successfully",
      location,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ✅ GET LOCATION
router.get("/get", async (req, res) => {

  try {

    const location =
      await AdminLocation.findOne();

    res.json(location);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

module.exports = router;