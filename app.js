const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// SOCKET.IO
const { Server } = require("socket.io");
const io = new Server(server);


// ROUTES
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

// IO connection
io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// EVENT EMMITERS
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

// BROADCASTING
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});