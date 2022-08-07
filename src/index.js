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

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if(token === 'SECRET_KEY') {
    next();
  } else {
    const err = new Error('Unauthorized');
    err.data = {
      details: 'Could not be authenticated'
    }
    next(err);
  }
});

io.on('connection', (socket) => {
  console.log(socket.id);
});


httpServer.listen(4500);