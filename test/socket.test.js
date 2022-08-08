import { Server as HTTPServer } from 'http';
import { Server as IOServer} from 'socket.io';
import Client from 'socket.io-client';

describe('Testing Socket.io', () => {
  let io, serverSocket, clientSocket;
  beforeAll((done) => {
    const httpServer = new HTTPServer();
    io = new IOServer(httpServer);

    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${ port }`);

      io.on('connection', (socket) => {
        serverSocket = socket;
      })

      clientSocket.on('connect', done)
    })
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  })

  test('Test event', (done) => {
    clientSocket.on('greeting', (greet) => {
      try {
        expect(greet).toBe('Hi');
        done();
      } catch(err) {
        done(err);
      }
    });

    serverSocket.emit('greeting', 'Hi');
  })

  test('Test callbacks (acknowledgements)', (done) => {
    serverSocket.on('bark', (callback) => {
      callback('woof!');
    })

    clientSocket.emit('bark', (arg) => {
      try {
        expect(arg).toBe('woof!');
        done();
      } catch(err) {
        done(err);
      }
    })
  })
})
