const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors());

server.listen(port, () => {
    console.log("Server listening on port: ", port);
});

io.set('origins', '*:*');


// namespace for notifications
const webAppNsp = io.of("/web-app");
webAppNsp.on("connection", (socket) => {
    let room;    
    socket.emit("welcome", "Welcome to web-app socket.io ...");

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        room = userId;
    });

    socket.on('disconnect', () => {
        socket.leave(room);
    });
});


// namespace for ios app
const iosAppNsp = io.of("/ios-app");
iosAppNsp.on("connection", (socket) => {
    let room;    
    socket.emit("welcome", "Welcome to ios-app socket.io ...");

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        room = userId;
    });

    socket.on('disconnect', () => {
        socket.leave(room);
    });
});


// namespace for android app
const androidAppNsp = io.of("/android-app");
androidAppNsp.on("connection", (socket) => {
    let room;
    socket.emit("welcome", "Welcome to android-app socket.io ...");

    socket.on("joinRoom", (userId) => {
        socket.join(userId);
        room = userId;
    });

    socket.on('disconnect', () => {
        socket.leave(room);
    });
});


app.post('/api/notification', (req, res) => {
    room = req.body.channel;
    eventName = req.body.event;
    message = req.body.data;

    webAppNsp.to(room).emit(eventName, message);
    iosAppNsp.to(room).emit(eventName, message);
    androidAppNsp.to(room).emit(eventName, message);

    res.end();
});


app.post('/api/mobile-info', (req, res) => {
    room = req.body.channel;
    eventName = req.body.event;
    message = req.body.data;

    iosAppNsp.to(room).emit(eventName, message);
    androidAppNsp.to(room).emit(eventName, message);
    
    res.end();
});
