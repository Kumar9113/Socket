const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  io.sockets.emit('socketm', 'chat message socket');

  socket.on('socketm', (data) => {
    console.log('at sever side');
  })

});

http.listen(3000, () => {
  console.log(`Server started!!!!`);
});