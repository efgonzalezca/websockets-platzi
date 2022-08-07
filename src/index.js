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

const teachers = io.of('teachers');
const students = io.of('students');

teachers.on('connection', (socket) => {
  console.log(socket.id + ' has been connected to teachers room');
  socket.on('send-message', ({ message, user }) => {
    teachers.emit('message', { message, user });
  })
});

students.on('connection', (socket) => {
  console.log(socket.id + ' has been connected to students room');
  socket.on('send-message', ({ message, user }) => {
    students.emit('message', { message, user });
  })
});

httpServer.listen(4500);