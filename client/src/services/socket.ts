// socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function initSocket(token: string): Socket {
  if (!socket) {
    socket = io("http://localhost:5000", {
      auth: { token },
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
