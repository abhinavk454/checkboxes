const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Placeholder for checkbox states
let checkboxStates = new Array(20).fill(false);

io.on("connection", (socket) => {
  // Send initial states
  socket.emit("initial-checkbox-states", checkboxStates);

  socket.on("checkbox-change", (data) => {
    checkboxStates[data.id] = data.checked;
    io.emit("checkbox-update", data); // Broadcast to all clients
  });
});

app.use(express.static("public/")); // Serve static files from 'public' folder

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
