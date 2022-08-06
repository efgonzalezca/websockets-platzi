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
const emitToLast = document.querySelector('#emit-to-last');
emitToLast.addEventListener('click', () => {
  socket.emit('last', 'The last one');
})

socket.on('greeting', (data) => {
  console.log(data);
})

socket.on('on', (data) => {
  console.log(data);
})

socket.once('once', (data) => {
  console.log(data);
})

const listener = () => {
  console.log('Turn off event');
}

socket.on('off', listener);

setTimeout(() => {
  socket.off('off', listener);
}, 2000)