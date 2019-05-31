    var express = require('express');
    var bodyParser = require('body-parser');
    var cookieParser = require('cookie-parser'); 
    var app = express();
    var http = require('http');
    var server = http.createServer(app);
    // var io = http.server(app);
    // var scoket = require('socket.io');

    // scoket(io);

    var login = require('./api/login.js');
    var user = require('./api/user.js');
    var register = require('./api/register');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static('static'));
    app.use(express.static('dist/chatWsPro'));
    app.use('/api/login' , login);
    app.use('/api/user', user);
    app.use('/api/register' , register);
    app.set(true)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ;
    server.listen(7200, () => console.log('Example app listening on port 7200!'));
    
    process.on('SIGINT', function () {
        console.log('stop');
    });
    
