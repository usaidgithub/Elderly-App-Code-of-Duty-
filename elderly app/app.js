const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5678;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Array to hold connected users
let users = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle user login
  socket.on('login', (data) => {
    // Add user to the list and notify all clients
    users.push(data);
    io.emit('user connected', users);
  });

  // Handle chat message
  socket.on('chat message', (data) => {
    // Emit the message to all clients
    io.emit('chat message', data);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // Remove user from the list
    users = users.filter(user => user.nickname !== data.nickname);
    io.emit('user connected', users); // Update user list for all clients
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
