const http = require('http').createServer();
const io = require('socket.io')(http, {
    path: '/',
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

io.on('connection' , function(scoket) {
    scoket.on('data' , (a , b) => {});
    scoket.emit('data', {a: 111});
});

http.listen(7201);
