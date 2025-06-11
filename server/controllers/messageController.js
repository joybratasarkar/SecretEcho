const Conversation = require('../models/Conversation');


exports.getUserConversations = async (req, res) => {
  try {
    const userIdFromParam = req.params.userId;
    const userIdFromToken = req.user.id; // from your auth middleware

    // Security check: user can only fetch their own conversations
    if (userIdFromParam !== userIdFromToken) {
      return res.status(403).json({ error: 'Forbidden: Access denied' });
    }

    const conversations = await Conversation.find({ participants: userIdFromParam })
      .populate({
        path: 'messages',
        populate: { path: 'sender', select: 'username _id' }  // populate sender info inside messages
      })
      .populate('participants', 'username _id');  // optionally populate participants with username

    res.status(200).json(conversations);
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
};
