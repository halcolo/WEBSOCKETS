
const path = require('path');
const express = require('express');
const app = express();

const SocketIO = require('socket.io');

// Settings
app.set('port', process.env.PORT || 3000);

app.all('/', function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// static files
app.use(express.static(path.join(__dirname + '/public')));

// Start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// Websockets
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('New Conenection', socket.id)

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });
    
    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
    });

});