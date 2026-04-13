const express = require("express");
const router = express.Router();

const {
  createNotice,
  getNotices,
  replyToNotice,
} = require("../controllers/noticeController");

router.post("/", createNotice);
router.get("/", getNotices);
router.post("/:id/reply", replyToNotice);

module.exports = router;