const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const socketHandler = require('./sockets/socketHandler');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});
require('dotenv').config();

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/message');

const app = express();
const server = http.createServer(app); // Use this server for both Express and Socket.io

// Middleware
app.use(cors({
  origin: "*", // Allow all origins
}));


// Apply the rate limiter to all requests
app.use(limiter);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', messageRoutes);


// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Create Socket.io server with proper CORS and transports config
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  },
  transports: ["websocket", "polling"], // Required to avoid xhr poll errors
});

// Attach socket handler
socketHandler(io);

// Start server using the `http` server instance, not `app`
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
