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

console.log(__dirname)
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

io.on('connection', (socket) => {

  console.log('Clients connected:', io.engine.clientsCount);
  console.log('ID socket connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('El socket ' + socket.id + ' se ha desconectado.');
  })

  socket.conn.once('upgrade', () => {
    console.log('We have gone from HTTP Long-Polling to', socket.conn.transport.name);
  })
})

httpServer.listen(4500);