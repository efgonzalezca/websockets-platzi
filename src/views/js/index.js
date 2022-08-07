const socket = io({
  auth: {
    token: 'SECRET_KEY'
  }
});

socket.on('connect_error', (err) => {
  console.log('Connection failed');
  console.log(err.message);
  console.log(err.data.details);
})