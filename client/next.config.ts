// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Proxy API routes
      },
      {
        source: "/socket.io/:path*", // Proxy WebSocket connection for Socket.IO
        destination: "http://localhost:5000/socket.io/:path*",
      },
    ];
  },
};
