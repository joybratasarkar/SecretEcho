// socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const BASE_URL = "https://secretecho-drzv.onrender.com"

export function initSocket(token: string): Socket {
  if (!socket) {
    socket = io(BASE_URL, {
      auth: { token },
      transports: ["websocket"], // optional: forces WebSocket
    });
    console.log('Socket initialized');
  }
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');

    socket = null;
  }
}
