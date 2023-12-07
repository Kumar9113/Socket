const { Socket } = require('net');
const { dirname } = require('path');

var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
var users = 0;

io.on('connection', (socket) => {
  console.log('A user connection');

  setTimeout(function () {
    socket.send("from server");
  }, 3000);

  setTimeout(function () {
    socket.emit('myCustoEvent', { description: 'Hello Kumar this is from event' });
  }, 3000)

  socket.on('mycustomEventFromClientSide', function (data) {
    console.log(data)

  })
  users++;
  socket.emit('broadcast', { massage: users + 'users Connected' })

  socket.on('disconnect', () => {
    console.log("A user disconnected");
    users--;
    io.sockets.emit('broadcast', { message: users + 'users connected!' });
  })
})

// io.on('connection',(socket)=>
// {
//      console.log("a user connected");
//    //   setTimeout(function()
//    //   {
//    //      socket.send("from server");

//    //   },3000);
//    //   setTimeout(function()
//    //   {
//    //    socket.emit('myCustoEvent',{description:'Hello Kumar this is from event'});
//    //   },3000)



//    //   socket.on('mycustomEventFromClientSide',function(data)
//    //   {
//    //    console.log(data)

//    //   })
//    //   setTimeout(function()
//    //   {
//    //      console.log('send message from server side by prereserved events');

//    //   },3000);



//    //   users++;

//    //   socket.emit('broadcast',{massage:users+'users Connected'})

//    // users++;
//    // socket.emit('newuserconnect',{message:'Hii welcome'});
//    // socket.broadcast.emit('newuserconnect',{message:users+" users Connected!"});

//    //   socket.on('disconnect',function()
//    //   {
//    //      console.log("Dissonnected");
//    //      users--;
//    //     // socket.emit('broadcast',{massage:users+' users Connected'})

//    //     socket.broadcast.emit('newuserconnect',{message:users+" users Connected!"});
//           io.emit('testEvent','Tester event call');
//       socket.on('disconnect',function()
//     {
//       console.log('a user dis connected');
//     })

//      });


// var kumar=io.of('/custom-namespace');
// kumar.on('connection',function(socket)
// {
//    console.log('A user connected');
//    kumar.emit('customEvent','custom event call');

//    socket.on('disconnect',function()
//    {
//       console.log('disconnectd');
//    })
// })
// var room=1;
// io.on('connection',function(socket){
//    console.log("A user connected");
//    socket.join("room-"+room);
//    socket.in("room-"+room).emit('connectedRoom','you are connected to room no.'+room);
//    socket.on('disconnect',function()
//    {
//       console.log('A user disconnectd');
//    })
// })
// io.on('connection',(socket)=>
// {
//    console.log(' A user connected');
//    socket.broadcast.emit('news', { hello: 'world' });


// })

// var roomno = 1;
// io.on('connection', function(socket){
//    socket.join("room-"+roomno);
//    //Send this event to everyone in the room.
//    io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
// })

http.listen(3001, function () {
  console.log("server sonnected")
})
