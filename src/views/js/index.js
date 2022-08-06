const socket = io();

const text = document.querySelector('#text')

socket.on('welcome', (data) => {
  text.textContent = data;
})

const emitToServer = document.querySelector('#emit-to-server');
emitToServer.addEventListener('click', () => {
  socket.emit('server', 'msg to server')
})

socket.on('everyone', (data) => {
  console.log(data);
})