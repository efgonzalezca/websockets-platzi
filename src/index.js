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

const socketsOnline = [];

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

io.on('connection', (socket) => {

  socketsOnline.push(socket.id);

  socket.emit('welcome', 'Connection established');

  socket.on('server', (data) => {
    console.log(data);
  })

  io.emit('everyone', `${socket.id} has connected`);

  socket.on('last', (data) => {
    const lastSocket = socketsOnline[socketsOnline.length - 1];
    io.to(lastSocket).emit('greeting', data);
  })

  socket.emit('on', 'Test on');
  socket.emit('on', 'Test on');

  socket.emit('once', 'Test once');
  socket.emit('once', 'Test once');

  socket.emit('off', 'Test');

  setTimeout(() => {
    socket.emit('off', 'Test');
  }, 3000)
})

httpServer.listen(4500);