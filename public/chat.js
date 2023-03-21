// Make connection
const socket = io.connect('http://localhost:4000');

//DOM

const output = document.getElementById('output');
const feedback = document.getElementById('feeback');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const button = document.getElementById('button');

// emit events
button.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: message.handle,
  });
  message.value = '';
});
