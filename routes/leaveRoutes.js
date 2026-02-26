const express = require("express");
const router = express.Router();

const leaveController = require("../controllers/leaveController");


// staff
router.post("/", leaveController.applyLeave);
router.get("/my/:employeeId", leaveController.getMyLeaves);


// admin
router.get("/", leaveController.getAllLeaves);

router.put("/approve/:id", leaveController.approveLeave);

router.put("/reject/:id", leaveController.rejectLeave);


module.exports = router;
