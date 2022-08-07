import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

io.on('connection', (socket) => {
  socket.leave(socket.connectedRoom)
  socket.connectedRoom = '';
  socket.on('connect-to-room', (room) => {
    switch(room) {
      case 'room1':
        socket.join('room1');
        socket.connectedRoom = 'room1';
        break;
      case 'room2':
        socket.join('room2');
        socket.connectedRoom = 'room2';
        break;
      case 'room3':
        socket.join('room3');
        socket.connectedRoom = 'room3';
        break;
    }
  })

  socket.on('message', (data) => {
    const room = socket.connectedRoom;

    io.to(room).emit('send-message', {
      data,
      room
    })
  })
})

httpServer.listen(4500);