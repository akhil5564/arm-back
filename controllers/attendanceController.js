const Attendance = require("../models/Attendance");

//////////////////////////////////////
// CHECK IN
//////////////////////////////////////

exports.checkIn = async (req, res) => {

  try {

    const { employeeId, latitude, longitude } = req.body;

    const today =
      new Date().toISOString().split("T")[0];

    const existing =
      await Attendance.findOne({
        employeeId,
        date: today,
      });

    if (existing && existing.checkInTime) {

      return res.status(400).json({
        message: "Already checked in today",
      });

    }

    const record =
      await Attendance.findOneAndUpdate(
        {
          employeeId,
          date: today,
        },
        {
          employeeId,
          date: today,
          checkInTime: new Date(),
          latitude,
          longitude,
        },
        {
          upsert: true,
          new: true,
        }
      );

    res.json({
      message: "Check-in successful",
      record,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

//////////////////////////////////////
// CHECK OUT
//////////////////////////////////////

exports.checkOut = async (req, res) => {

  try {

    const { employeeId } = req.body;

    const today =
      new Date().toISOString().split("T")[0];

    const record =
      await Attendance.findOne({
        employeeId,
        date: today,
      });

    if (!record || !record.checkInTime) {

      return res.status(400).json({
        message: "Check-in first",
      });

    }

    if (record.checkOutTime) {

      return res.status(400).json({
        message: "Already checked out",
      });

    }

    record.checkOutTime = new Date();

    await record.save();

    res.json({
      message: "Check-out successful",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

//////////////////////////////////////
// GET TODAY
//////////////////////////////////////

exports.getTodayAttendance = async (req, res) => {

  try {

    const { employeeId } = req.params;

    const today =
      new Date().toISOString().split("T")[0];

    const record =
      await Attendance.findOne({
        employeeId,
        date: today,
      });

    res.json(record);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};