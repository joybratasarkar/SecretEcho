"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { fetchMessages } from "@/services/api"; // Your API to fetch past messages

// const BASE_URL = "http://localhost:5000"; // Defined at the top
const BASE_URL = "https://secretecho-drzv.onrender.com"

function LoadingDots() {
  return <span className="animate-pulse text-sm text-gray-500">Typing...</span>;
}

interface Message {
  _id: string;
  content: string;
  sender: { _id: string; username: string } | null;
  createdAt: string;
  isAIResponse: boolean;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Grab token and user_id from localStorage if available
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const user_id = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

  useEffect(() => {
    if (!token || !user_id) return;
    console.log("Connecting to socket with token:", token, "and user_id:", user_id);

    // Connect socket with token auth
    const socket = io(BASE_URL, {
      auth: { token },
      transports: ["websocket"], // optional: force websocket
      withCredentials: true,
    });
    console.log("Socket connected:", socket.id);

    socketRef.current = socket;

    // Fetch existing messages from API
    setLoading(true);
    fetchMessages(token, user_id)
      .then((conversations) => {
        const allMessages = conversations.flatMap((conv: any) => conv.messages);
        setMessages(allMessages);
      })
      .catch((err) => console.error("Failed to fetch messages:", err))
      .finally(() => setLoading(false));
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });
    // Listen for new messages from server
    socket.on("newMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
      console.log("New message received:", msg);

    });

    socket.on("connect_error", (err: any) => {
      console.error("❌ Socket connection error:", err.message || err);
    });

    socket.on("aiTyping", (typing: boolean) => {
      setAiTyping(typing);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
      socket.off("newMessage");
      socket.off("aiTyping");
      socket.off("connect_error");
      socketRef.current?.removeAllListeners();

      socketRef.current = null;
    };
  }, [token, user_id]);

  // Scroll to bottom on new messages or typing indicator change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  // Send message handler
  const handleSend = () => {
    if (!input.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", input.trim());
    setInput("");
  };

  return (
    <div className="p-6 h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Messages display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-2" style={{ scrollbarWidth: "thin" }}>
        {loading ? (
          <div className="text-center text-gray-400 mt-10">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">No messages yet</div>
        ) : (
          messages.map((msg) => {
            // Determine if the message is from the current user
            // Assuming user_id is stored as string matching sender._id or sender.username
            const isUser = msg.sender?._id === user_id || msg.sender?.username === user_id;
            const isAI = msg.isAIResponse;

            return (
              <div
                key={msg._id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg break-words 
          ${isUser ? "bg-blue-600 text-white rounded-br-none" : ""}
          ${isAI ? "bg-gray-300 text-gray-900 rounded-bl-none" : ""}
          ${!isUser && !isAI ? "bg-gray-200 text-gray-900 rounded-bl-none" : ""}
        `}
                >
                  <div className="whitespace-pre-wrap text-left">{msg.content}</div>
                </div>
              </div>
            );
          })
        )}
        {aiTyping && (
          <div className="max-w-[60%] px-4 py-2 bg-gray-200 rounded-xl rounded-bl-none shadow-sm text-gray-600 select-none">
            <LoadingDots />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input box and send button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex space-x-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type your message..."
          autoComplete="off"
          spellCheck={false}
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className={`px-5 py-2 rounded-md text-white font-semibold transition
            ${input.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"}
          `}
        >
          Send
        </button>
      </form>
    </div>
  );
}
