const express = require("express");
const {
  sendMessage,
  getMessages,
  getChatList,
} = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/send-message", authMiddleware, sendMessage);
router.get("/:buddyId", authMiddleware, getMessages);
router.get("/:userId/chat-list", authMiddleware, getChatList);

module.exports = router;
