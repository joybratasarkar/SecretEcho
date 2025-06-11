// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  content: String,
  isAIResponse: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }, // 👈 link
});

module.exports = mongoose.model('Message', messageSchema);
