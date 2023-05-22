import http from 'http';
import { Server } from 'socket.io';

const Messages = [];
const Users = {};

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Update with the URL of your Vite development server
    methods: ['GET', 'POST'], // Adjust the allowed methods as per your requirements
  },
});

io.on('connection', (socket) => {
  console.log( `${socket.id} connected!`);
  socket.emit('Messages', Messages)

  socket.on('username', (username) => {
    socket.username = username;
    Users[socket.id] = username
    io.emit('users', Users)
  })

  socket.on('Message', (msg) => {
    Messages.push(msg)
    io.emit('Message', `${socket.username} : ${msg}`)
  })

  socket.on('disconnect', () => {

    console.log(`${socket.id} disconnected`)
  })
  // Handle Socket.IO events here
});





const PORT = 3001; // Port for Socket.IO server

server.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
