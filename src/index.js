import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer, {
  cors: {
    origin: ['https:admin.socket.io'],
    credentials: true
  }
});

instrument(io, {
  auth: {
    type: 'basic',
    username: 'admin',
    password: '$2b$10$rIUoP06.v80Ob9Q58Pkcp.73QBRlTzBUj0WUiRHe/E2MoNPSvVN7S'
  }
})

app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

io.on('connection', (socket) => {
  socket.on('circle-position', (data) => {
    socket.broadcast.emit('move-circle', data);
  });
});


httpServer.listen(4500);