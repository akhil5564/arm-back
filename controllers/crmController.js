const Lead = require("../models/Lead");
const User = require("../models/User");


// ✅ Get all leads (Admin)
exports.getLeads = async (req, res) => {
  try {

    const leads = await Lead.find().sort({ createdAt: -1 });

    const leadsWithEmployee = await Promise.all(
      leads.map(async (lead) => {

        const user = await User.findOne({
          employeeId: lead.employeeId
        });

        return {
          ...lead._doc,
          employeeName: user ? user.name : "Unassigned"
        };

      })
    );

    res.json(leadsWithEmployee);

  } catch (err) {

    console.error(err);
    res.status(500).json({
      error: err.message
    });

  }
};



// ✅ Staff get only their leads
exports.getMyLeads = async (req, res) => {

  try {

    const leads = await Lead.find({
      employeeId: req.params.employeeId
    }).sort({ createdAt: -1 });

    res.json(leads);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};



// ✅ Create lead
exports.createLead = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      employeeId,
      status,
      notes,
      followUps,
      businessType,
      businessName,
    } = req.body;


    const user = await User.findOne({
      employeeId
    });

    if (!user)
      return res.status(400).json({
        error: "Invalid employeeId"
      });


    const newLead = new Lead({

      name,
      email,
      phone,
      employeeId,
      employeeName: user.name,
      status: status || "New",

      notes: notes || [],

      followUps: followUps || []

    });

    const savedLead = await newLead.save();

    res.status(201).json(savedLead);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};



// ✅ Update lead (IMPORTANT FIX)
exports.updateLead = async (req, res) => {

  try {

    const { id } = req.params;

    const lead = await Lead.findById(id);

    if (!lead)
      return res.status(404).json({
        error: "Lead not found"
      });


    // Update fields safely
    lead.name = req.body.name ?? lead.name;

    lead.email = req.body.email ?? lead.email;

    lead.phone = req.body.phone ?? lead.phone;

    lead.status = req.body.status ?? lead.status;
    lead.businessType = req.body.businessType ?? lead.businessType;
    lead.businessName = req.body.businessName ?? lead.businessName;


    // ✅ VERY IMPORTANT
    if (req.body.notes)
      lead.notes = req.body.notes;

    if (req.body.followUps)
      lead.followUps = req.body.followUps;


    const updatedLead = await lead.save();

    res.json(updatedLead);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};



// ✅ Add note
exports.addNote = async (req, res) => {

  try {

    const { id } = req.params;

    const { note } = req.body;

    const lead = await Lead.findById(id);

    if (!lead)
      return res.status(404).json({
        error: "Lead not found"
      });


    lead.notes.push({

      note,
      createdAt: new Date()

    });

    await lead.save();

    res.json(lead);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};



// ✅ Add follow-up
exports.addFollowUp = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      date,
      description
    } = req.body;

    const lead = await Lead.findById(id);

    if (!lead)
      return res.status(404).json({
        error: "Lead not found"
      });


    lead.followUps.push({

      date,
      description

    });

    await lead.save();

    res.json(lead);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};



// ✅ Delete lead
exports.deleteLead = async (req, res) => {

  try {

    const { id } = req.params;

    const deleted = await Lead.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({
        error: "Lead not found"
      });

    res.json({
      message: "Lead deleted successfully"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }

};
