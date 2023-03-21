/* This is creating a connection to the server. */
const socket = io.connect('http://localhost:4000');

/* This is getting the elements from the DOM. */
const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

/* Listening for the click event on the button and then emitting the chat event with message and name */
btn.addEventListener('click', () => {
  /* Sending the message and the handle to the server. */
  socket.emit('chat', {
    message: message.value,
    handle: handle.value,
  });
  message.value = '';
});

/* This is listening for the 'chat' event and then running the function that is passed in. */
/* Listening for the chat event and then appending the message to the output div. */

socket.on('chat', function (data) {
  feedback.innerHTML = '';
  output.innerHTML +=
    '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});
