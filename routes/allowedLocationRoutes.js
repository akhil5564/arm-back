const express = require("express");
const router = express.Router();

const AllowedLocation = require("../models/AllowedLocation");


// SET LOCATION (Admin)
router.post("/set", async (req, res) => {

  try {

    const { latitude, longitude, radius } = req.body;

    let location = await AllowedLocation.findOne();

    if (location) {

      location.latitude = latitude;
      location.longitude = longitude;
      location.radius = radius || 200;

      await location.save();

    } else {

      location = new AllowedLocation({
        latitude,
        longitude,
        radius: radius || 200,
      });

      await location.save();

    }

    res.json({
      message: "Location set successfully",
      location,
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


// GET LOCATION
router.get("/get", async (req, res) => {

  try {

    const location = await AllowedLocation.findOne();

    res.json(location);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

module.exports = router;