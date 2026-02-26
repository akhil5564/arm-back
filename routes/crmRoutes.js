const express = require("express");
const router = express.Router();

const crmController = require("../controllers/crmController");


// CRUD
router.get("/", crmController.getLeads);

router.get("/my-leads/:employeeId", crmController.getMyLeads);

router.post("/", crmController.createLead);

router.put("/:id", crmController.updateLead);

router.delete("/:id", crmController.deleteLead);


// Notes
router.post("/:id/notes", crmController.addNote);


// FollowUps
router.post("/:id/followups", crmController.addFollowUp);


module.exports = router;
