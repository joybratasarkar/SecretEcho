const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middlewares/authMiddleware');


// (Optional) Get all conversations for a user
router.get('/conversations/:userId', authMiddleware, messageController.getUserConversations);

module.exports = router;
