const Notice = require("../models/Notice");

// Create Notice (Manager)
exports.createNotice = async (req, res) => {
  try {
    const { title, message, priority, recipients } = req.body;

    const notice = new Notice({
      title,
      message,
      priority,
      createdBy: req.user.id,
      recipients, // [] = all staff
    });

    await notice.save();

    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notice" });
  }
};

// Get Notices (Staff / Manager)
exports.getNotices = async (req, res) => {
  try {
    const userId = req.user.id;

    const notices = await Notice.find({
      $or: [
        { recipients: { $size: 0 } }, // for all
        { recipients: userId },
      ],
    })
      .populate("createdBy", "name role")
      .populate("replies.user", "name");

    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notices" });
  }
};

// Reply to Notice
exports.replyToNotice = async (req, res) => {
  try {
    const { message } = req.body;

    const notice = await Notice.findById(req.params.id);

    notice.replies.push({
      user: req.user.id,
      message,
    });

    await notice.save();

    res.json(notice);
  } catch (error) {
    res.status(500).json({ error: "Failed to reply" });
  }
};