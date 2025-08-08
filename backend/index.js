const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');

app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin:process.env.FE_URI,
        methods:["GET", "POST"],
    }
});

const users = new Set();

io.on('connection', (socket) => {
    console.log("id:",socket.id);
    
   
    socket.on("join-room", (room) => {
        users.add(socket.id);
        console.log(users.size);
        socket.join(room);
        console.log(socket.rooms);
        
    });

    socket.on("send-message", ({room, userMessage, sender, otherName}) => {
        console.log(otherName);
        
        io.to(room).emit("receive-message", {userMessage, sender, otherName});
    })

    socket.on("leave-room", (joinedRoom) => {
        users.delete(socket.id);
        console.log(users.size);
        socket.rooms.delete(joinedRoom)
        console.log(socket.rooms);
        
    });

    socket.on('disconnect', () => {
        users.delete(socket.id);
        console.log(users.size);
    });
   
});

server.listen(9000, () => {
    console.log("Server is running");
});
