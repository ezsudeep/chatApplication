const express = require('express');
const morgan = require('morgan');
const app = express();
const socket = require('socket.io');
require('dotenv').config();

app.use(morgan('tiny'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
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

  //hnadle chat events
  socket.on('chat', (data) => {
    io.sockets.emit('data', data);
  });
});
