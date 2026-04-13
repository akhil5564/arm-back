const Leave = require("../models/Leave");
const User = require("../models/User");

/* ================= UNDO LEAVE ================= */

exports.undoLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    if (leave.status === "Pending") {
      return res.status(400).json({ message: "Leave is already pending" });
    }

    leave.status = "Pending";
    leave.remarks = "";
    leave.approvedBy = "";

    await leave.save();

    res.json({
      message: "Leave moved back to Pending",
      leave,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= APPLY LEAVE ================= */

exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, fromDate, toDate, reason, leaveLetter } = req.body;

    // ✅ VALIDATION
    if (!employeeId || !fromDate || !toDate || !reason || !leaveLetter) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(toDate) < new Date(fromDate)) {
      return res.status(400).json({ message: "To date cannot be before From date" });
    }

    // ✅ CHECK USER
    const user = await User.findOne({ employeeId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ PREVENT DUPLICATE
    const existingLeave = await Leave.findOne({
      employeeId,
      fromDate,
      toDate,
    });

    if (existingLeave) {
      return res.status(400).json({
        message: "Leave already applied for these dates",
      });
    }

    // ✅ CREATE LEAVE
    const leave = new Leave({
      employeeId,
      employeeName: user.name,
      role: user.role,
      fromDate,
      toDate,
      reason,
      leaveLetter, // ✅ NEW FIELD
      status: "Pending",
    });

    await leave.save();

    res.json({
      message: "Leave applied successfully",
      leave,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= GET ALL LEAVES (ADMIN) ================= */

exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= APPROVE LEAVE ================= */

exports.approveLeave = async (req, res) => {
  try {
    const { remarks, adminName } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "Approved";
    leave.remarks = remarks || "";
    leave.approvedBy = adminName || "";

    await leave.save();

    res.json({
      message: "Leave approved successfully",
      leave,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= REJECT LEAVE ================= */

exports.rejectLeave = async (req, res) => {
  try {
    const { remarks, adminName } = req.body;

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    leave.status = "Rejected";
    leave.remarks = remarks || "";
    leave.approvedBy = adminName || "";

    await leave.save();

    res.json({
      message: "Leave rejected successfully",
      leave,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


/* ================= STAFF LEAVE HISTORY ================= */

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      employeeId: req.params.employeeId,
    }).sort({ createdAt: -1 });

    res.json(leaves);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};