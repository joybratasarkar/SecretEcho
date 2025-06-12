# SecretEcho

SecretEcho is a real-time, AI-powered messaging application where users can chat with an AI companion. Built with scalability, modularity, and clean architecture in mind, this project showcases a production-ready full-stack system with real-time updates, asynchronous AI response handling, and memory-aware conversation management.

---

## 🚀 Features

### 🔸 Frontend (Next.js + Tailwind CSS)
- JWT-based authentication
- Responsive chat interface
- Real-time messaging via Socket.IO
- Modular architecture with custom hooks and services
- AI typing indicator and message persistence

### 🔸 Backend (Node.js + Express + MongoDB)
- JWT-secured auth and messaging APIs
- Real-time communication using Socket.IO
- Vertex AI integration for dynamic AI replies
- Short-term and long-term memory handling for conversational context

---

## 🧱 Architecture Overview

### 🔹 Client (Frontend)

The frontend is built using **React with Next.js App Router** and styled with **Tailwind CSS**. It communicates with the backend via REST and Socket.IO, and maintains a clean separation of concerns across UI, socket logic, and state management.

**Highlights:**
- `useChat` hook handles socket lifecycle, real-time updates, and AI typing indicator.
- `socket.ts` manages authenticated Socket.IO connections.
- JWT tokens are persisted in `localStorage` for session continuity.
- The `ChatBox` component displays messages and controls input.
- Scoped layouts and routing with App Router.

### 🔹 Server (Backend)

The backend is built using **Node.js**, **Express**, and **MongoDB**, following modular patterns for scalability and production readiness.

**Authentication:**
- JWT-based login and signup endpoints. 
- Middleware-secured routes and socket connections.

**Messaging:**
- REST endpoints for sending and retrieving messages.
- Real-time message delivery via Socket.IO (JWT-authenticated).

**AI Companion:**
- AI responses are generated via **Vertex AI**.

**Memory Architecture:**
- Implements both short-term and long-term memory layers to store and reference user interactions intelligently.

**Production Readiness:**
- Scalable architecture with middleware, modular routes, services.

---

## ⚙️ Tech Stack

| Layer        | Technology                                |
|--------------|--------------------------------------------|
| Frontend     | React, Next.js (App Router), Tailwind CSS  |
| Backend      | Node.js, Express, MongoDB                  |
| Realtime     | Socket.IO                                  |
| Auth         | JWT (JSON Web Token)                       |
| AI Agent     | Vertex AI                                  |
| Queue System | RabbitMQ (Work Queues)                     |

---

## 🛠 Setup Instructions (Manual)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/secretecho.git
cd secretecho


2️⃣ Setup Backend (Manual)

cd server
npm install


Create .env in server/:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/secretecho
JWT_SECRET=your_jwt_secret
GOOGLE_PROJECT_ID=your_project_id
GOOGLE_CLIENT_EMAIL=your_email
GOOGLE_PRIVATE_KEY=your_private_key
RABBITMQ_URI=amqp://localhost


Run server:

npm run dev


3️⃣ Setup Frontend (Manual)

cd ../client
npm install
npm run dev

🐳 Docker Setup (Recommended for Local/Production)

✅ Prerequisites

    Docker & Docker Compose installed

🐋 Build & Run the Full Stack

docker-compose down -v  # cleanup if needed
docker-compose up --build

🧾 docker-compose.yml Highlights

    MongoDB exposed on 27017

    RabbitMQ on 5673, Management UI on 15673

    Server runs on localhost:5000

    Client (Next.js) runs on localhost:3000

🔐 Required .env (server/.env)

PORT=5000
MONGODB_URI=mongodb://mongo:27017/secretecho
JWT_SECRET=your_jwt_secret
GOOGLE_APPLICATION_CREDENTIALS=./xyz.json
RABBITMQ_URI=amqp://rabbitmq

🗂 Project Structure

secretecho/
├── client/                     # Frontend (Next.js + Tailwind)
│   ├── app/                    # App Router pages
│   ├── components/             # UI components (ChatBox, etc.)
│   ├── hooks/                  # Custom React hooks (e.g., useChat)
│   ├── sockets/                # Socket.IO client setup
│   ├── services/               # API service (login, messages)
│   ├── styles/                 # Tailwind CSS & globals
│   └── public/                 # Static assets

├── server/                     # Backend (Node.js + Express)
│   ├── controllers/            # Auth/message logic
│   ├── routes/                 # Express routes
│   ├── models/                 # Mongoose models (User, Message)
│   ├── middlewares/            # Auth, error handling
│   ├── memory/                 # Short-term and long-term memory
│   ├── services/               # Vertex AI & token services
│   ├── sockets/                # Socket.IO server logic
│   ├── config/                 # DB & RabbitMQ setup
│   ├── app.js                  # Main Express app entry
│   └── worker.js               # Background job worker

├── docker-compose.yml          # Docker orchestration file
├── README.md                   # This documentation
└── .env                        # Backend env variables (not committed)





🧪 Development Notes

    Vertex AI credentials are loaded via environment variables.


    The backend can be scaled horizontally .

    Frontend uses Tailwind and App Router for lightweight styling and routing.


🧠 Architecture & Design Decisions

    The project follows a clear separation of concerns between frontend and backend, allowing independent scaling and modular development.

    Real-time communication is handled using Socket.IO, with JWT-based authentication passed during the socket handshake for secure, user-specific connections.

    AI response generation is powered by Vertex AI and offloaded to a RabbitMQ work queue, preventing blocking operations and simulating production-ready async behavior.

    A memory architecture is used:

        Short-term memory retains context for the current session.

        Long-term memory persists chat history for future reference and personalization.

    The frontend is built using Next.js App Router and Tailwind CSS, with a clean, modular design:

        useChat manages socket lifecycle and message state.

        socket.ts abstracts connection logic.

        ChatBox handles the chat UI and input interaction.

    The backend uses modular folders (controllers/, routes/, services/, sockets/) and middleware for clean request handling, error management, and security.

    JWT authentication, async processing, and clean state management reflect a system designed for real-world scalability and maintainability.

