const amqp = require('amqplib');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { getAIResponse } = require('../controllers/vertexAIClient');
const { getFormattedShortTermMemory } = require('../memory/shortTermMemory');
const { getFormattedLongTermMemory } = require('../memory/longTermMemory');
const socketClient = require('socket.io-client');

require('dotenv').config();
const RABBITMQ_URL = process.env.RABBITMQ_URL;
const QUEUE_NAME = 'ai-messages';
const SOCKET_SERVER_URL = process.env.SOCKET_SERVER_URL || 'http://localhost:3000';

const socket = socketClient(SOCKET_SERVER_URL, {
  reconnection: true,
  transports: ['websocket'],
});
socket.on('connect', () => console.log('✅ Worker connected to Socket.IO server'));

async function startWorker() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log('✅ Worker connected to RabbitMQ');

    channel.consume(QUEUE_NAME, async (msg) => {
      if (!msg) return;

      const job = JSON.parse(msg.content.toString());
      console.log('📥 Worker received job:', job);

      try {
        const [stm, ltm] = await Promise.all([
          getFormattedShortTermMemory(job.userId),
          getFormattedLongTermMemory(job.userId),
        ]);

        const memoryContext = `${ltm}\n${stm}`;
        const prompt = `${memoryContext}\nUser: ${job.userMessage}\nAI:`;
        console.log('📚 AI Prompt:\n', prompt);

        const aiText = await getAIResponse(prompt);
        console.log('🤖 AI Response:', aiText);

        const aiMsg = new Message({
          sender: null,
          content: aiText,
          isAIResponse: true,
          conversation: job.conversationId,
        });
        await aiMsg.save();

        const conversation = await Conversation.findById(job.conversationId);
        conversation.messages.push(aiMsg._id);
        conversation.updatedAt = new Date();
        await conversation.save();

        socket.emit('newMessage', {
          _id: aiMsg._id,
          content: aiMsg.content,
          sender: null,
          createdAt: aiMsg.createdAt,
          isAIResponse: true,
        });
        socket.emit('aiTyping', false);

        channel.ack(msg);
      } catch (err) {
        console.error('❌ Error processing job:', err.message);
        channel.nack(msg, false, true); // retry job
      }
    }, { noAck: false });

  } catch (err) {
    console.error('❌ Worker startup failed:', err.message);
  }
}

startWorker();
