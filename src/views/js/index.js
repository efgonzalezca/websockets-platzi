const socket = io();

const checkSocketStatus = () => {
  console.log('Socket status:', socket.connected);
}

socket.on('connect', () => {
  console.log(`Socket ${socket.id} connected`);
  checkSocketStatus();
})

socket.on('connect_error', () => {
  console.log('Connection could not be established');
})

socket.on('disconnect', () => {
  console.log(`Sockect ${socket.id} disconnected`);
  checkSocketStatus();
})

socket.io.on('reconnect_attempt', () => {
  console.log('Socket is tried reconnected');
})

socket.io.on('reconnect', () => {
  console.log('Successful reconnection');
})