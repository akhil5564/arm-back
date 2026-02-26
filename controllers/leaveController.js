const Leave = require("../models/Leave");
const User = require("../models/User");


// STAFF APPLY LEAVE
exports.applyLeave = async (req, res) => {

  try {

    const { employeeId, fromDate, toDate, reason } = req.body;

    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const leave = new Leave({

      employeeId,
      employeeName: user.name,
      role: user.role,
      fromDate,
      toDate,
      reason,
      status: "Pending"

    });

    await leave.save();

    res.json(leave);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};



// ADMIN GET ALL LEAVES
exports.getAllLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find().sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};



// APPROVE LEAVE WITH REMARK
exports.approveLeave = async (req, res) => {

  try {

    const { remarks, adminName } = req.body;

    const leave = await Leave.findByIdAndUpdate(

      req.params.id,

      {
        status: "Approved",
        remarks,
        approvedBy: adminName,
      },

      { new: true }

    );

    res.json(leave);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};




// REJECT LEAVE WITH REMARK
exports.rejectLeave = async (req, res) => {

  try {

    const { remarks, adminName } = req.body;

    const leave = await Leave.findByIdAndUpdate(

      req.params.id,

      {
        status: "Rejected",
        remarks,
        approvedBy: adminName,
      },

      { new: true }

    );

    res.json(leave);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};



// STAFF LEAVE HISTORY
exports.getMyLeaves = async (req, res) => {

  try {

    const leaves = await Leave.find({

      employeeId: req.params.employeeId

    }).sort({ createdAt: -1 });

    res.json(leaves);

  } catch {

    res.status(500).json({ message: "Server error" });

  }

};
