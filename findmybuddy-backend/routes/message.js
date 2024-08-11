const express = require('express');
const { sendMessage, getMessages, getChatList } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/:userId/:buddyId', authMiddleware, getMessages);
router.get('/chatlist', authMiddleware, getChatList);

module.exports = router;
