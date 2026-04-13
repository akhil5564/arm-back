const express = require("express");
const router = express.Router();
console.log("Leave Routes File Loaded ✅");

const leaveController = require("../controllers/leaveController");


// staff
router.post("/", leaveController.applyLeave);
router.get("/my/:employeeId", leaveController.getMyLeaves);


// admin
router.get("/", leaveController.getAllLeaves);

router.put("/approve/:id", leaveController.approveLeave);

router.put("/reject/:id", leaveController.rejectLeave);
//router.put("/undo/:id", leaveController.undoLeave); //  ADD THIS
//router.put("/undo/:id", undoLeave); // ✅ THIS MUST EXIST
 // ✅ ADD THIS UNDO ROUTE
router.put("/undo/:id", leaveController.undoLeave);


module.exports = router;
