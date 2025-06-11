const jwt = require('jsonwebtoken');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const amqp = require('amqplib');
const { getAIResponse } = require('../controllers/vertexAIClient');
const { addMessageToMemory, getFormattedShortTermMemory } = require('../memory/shortTermMemory');
const { saveToLongTermMemory, getFormattedLongTermMemory } = require('../memory/longTermMemory');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const RABBITMQ_URL = 'amqps://zipjmmie:5USBjq2UI-34ljPgimqPJoU1iKObowLM@puffin.rmq2.cloudamqp.com/zipjmmie';

let rabbitmqChannel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    rabbitmqChannel = channel;
    console.log('✅ Connected to RabbitMQ');
    // Example: Assert a queue (optional, depending on your use case)
    await channel.assertQueue('ai-messages');
  } catch (err) {
    console.error('❌ Failed to connect to RabbitMQ:', err.message);
  }
}
connectRabbitMQ(); // Immediately try connecting when the server starts

module.exports = (io) => {

  
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error'));

    try {
      const user = jwt.verify(token, JWT_SECRET);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.username}`);

    socket.on('sendMessage', async (msgContent) => {
      let conversation = await Conversation.findOne({ participants: [socket.user.id] });
      if (!conversation) {
        conversation = new Conversation({ participants: [socket.user.id], messages: [] });
        await conversation.save();
      }

      const message = new Message({
        sender: socket.user.id,
        content: msgContent,
        conversation: conversation._id,
      });
      await message.save();

      conversation.messages.push(message._id);
      conversation.updatedAt = new Date();
      await conversation.save();

      // Save memory
      addMessageToMemory(socket.user.id, msgContent); // STM (in-memory)
      await saveToLongTermMemory(socket.user.id, msgContent); // LTM (MongoDB)

      io.emit('newMessage', {
        _id: message._id,
        content: message.content,
        sender: { _id: socket.user.id, username: socket.user.username },
        createdAt: message.createdAt,
        isAIResponse: false,
      });

      io.emit('aiTyping', true);

      try {
        const [stm, ltm] = await Promise.all([
          getFormattedShortTermMemory(socket.user.id),
          getFormattedLongTermMemory(socket.user.id),
        ]);

        const memoryContext = `${ltm}\n${stm}`;
        const aiPrompt = `${memoryContext}\nUser: ${msgContent}\nAI:`;
        console.log('aiPrompt:', aiPrompt);

        const aiResponseText = await getAIResponse(aiPrompt);

        const aiMessage = new Message({
          sender: null,
          content: aiResponseText,
          isAIResponse: true,
          conversation: conversation._id,
        });
        await aiMessage.save();

        conversation.messages.push(aiMessage._id);
        conversation.updatedAt = new Date();
        await conversation.save();

        io.emit('aiTyping', false);
        io.emit('newMessage', {
          _id: aiMessage._id,
          content: aiMessage.content,
          sender: null,
          createdAt: aiMessage.createdAt,
          isAIResponse: true,
        });

      } catch (err) {
        console.error('VertexAI Error:', err);
        io.emit('aiTyping', false);
        io.emit('newMessage', {
          content: 'Error generating AI response.',
          isAIResponse: true,
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.username}`);
    });
  });
};
