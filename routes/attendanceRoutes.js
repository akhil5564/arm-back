const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");
const AllowedLocation = require("../models/AllowedLocation");
const User = require("../models/User");


// distance calculation
function getDistance(lat1, lon1, lat2, lon2) {

  const R = 6371e3;

  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;

  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a =
    Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ/2) * Math.sin(Δλ/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}



////////////////////////////////////////////////////////
// CHECK IN
////////////////////////////////////////////////////////

router.post("/checkin", async (req, res) => {

  try {

    const { employeeId, name, latitude, longitude } = req.body;

    if (!employeeId || !name) {

      return res.status(400).json({
        message: "Employee ID and name required",
      });

    }

    const location = await AllowedLocation.findOne();

    if (!location) {

      return res.status(400).json({
        message: "Admin location not set",
      });

    }

    const distance = getDistance(
      latitude,
      longitude,
      location.latitude,
      location.longitude
    );

    if (distance > location.radius) {

      return res.status(400).json({
        message: "You are outside allowed location",
      });

    }

    const today = new Date().toISOString().split("T")[0];

    const exists = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (exists) {

      return res.status(400).json({
        message: "Already checked in today",
      });

    }

    const attendance = new Attendance({

      employeeId,
      name,
      date: today,

      checkIn: {
        time: new Date(),
        latitude,
        longitude,
      },

      status: "Present",

    });

    await attendance.save();

    res.json({
      message: "Check-in successful",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



////////////////////////////////////////////////////////
// CHECK OUT
////////////////////////////////////////////////////////

router.post("/checkout", async (req, res) => {

  try {

    const { employeeId, latitude, longitude } = req.body;

    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employeeId,
      date: today,
    });

    if (!attendance) {

      return res.status(400).json({
        message: "Check-in not found",
      });

    }

    if (attendance.checkOut?.time) {

      return res.status(400).json({
        message: "Already checked out",
      });

    }

    attendance.checkOut = {

      time: new Date(),
      latitude,
      longitude,

    };

    await attendance.save();

    res.json({
      message: "Check-out successful",
      attendance,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



////////////////////////////////////////////////////////
// ADMIN VIEW ATTENDANCE CALENDAR
////////////////////////////////////////////////////////

router.get("/calendar", async (req, res) => {

  try {

    const { date } = req.query;

    const users = await User.find();

    const attendance = await Attendance.find({ date });

    const presentIds = attendance.map(a => a.employeeId);

    const result = users.map(user => ({

      employeeId: user.employeeId,
      name: user.name,

      status: presentIds.includes(user.employeeId)
        ? "Present"
        : "Absent",

    }));

    res.json(result);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});



////////////////////////////////////////////////////////
// ADMIN GET ALL ATTENDANCE
////////////////////////////////////////////////////////

router.get("/all", async (req, res) => {

  try {

    const attendance = await Attendance.find()
      .sort({ date: -1 });

    res.json(attendance);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});


module.exports = router;