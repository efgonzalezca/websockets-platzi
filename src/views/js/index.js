const socket = io();

const circle = document.querySelector('#circle');

const drawCircle = ({ top, left }) => {
  circle.style.top = top;
  circle.style.left = left;
}

const drag = (e) => {
  const position = {
    top: e.clientY + 'px',
    left: e.clientX + 'px'
  };
  drawCircle(position);
  console.log('Event sends to server');
  socket.volatile.emit('circle-position', position);
}

document.addEventListener('mousedown', (e) => {
  document.addEventListener('mousemove', drag)
})

document.addEventListener('mouseup', (e) => {
  document.removeEventListener('mousemove', drag)
})

socket.on('move-circle', ({ top, left }) => {
  drawCircle({ top, left });
}) 