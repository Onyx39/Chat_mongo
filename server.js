const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 4420 });

server.on('connection', (socket) => {
  console.log('Client connecté');

  socket.on('message', (message) => {
    console.log(`Message reçu du client : ${message}`);
  });

  socket.on('close', () => {
    console.log('Client déconnecté');
  });
});
