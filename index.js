const express = require('express');
const morgan = require('morgan');
const app = express();
const socket = require('socket.io');
require('dotenv').config();

app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});

// socket setup
const io = socket(server, { cors: { origin: '*' } });

/* Listening for a connection event. When a connection is made, it will log the socket id. */
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  //handle chat events

  /* Listening for a chat event. When a chat event is emitted, it will log the data and emit the data
  to all sockets. */
  socket.on('chat', (data) => {
    console.log(data);
    /* Emitting the data to all sockets. */
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
