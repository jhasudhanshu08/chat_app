const path = require("path");
const express = require("express");
const http = require("http")
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")))


//run when user connects
io.on("connection", (socket) => {
    console.log("New WS Connection...");

    //When current user enters 
    socket.emit("message", "Welcome to ChatBot");

    //Broadcast hte message when some user join the chat
    socket.broadcast.emit("message", "A user has joined the chat !!");

    //message of disconnecting of a user
    socket.on("disconnect", () => {
        io.emit("message", "A user has left the Chat Room !!")
    })

    //Catch chatMessage from main.js
    socket.on("chatMessage", (msg) => {
        console.log(msg);
    })
})

server.listen(3000, () => {
    console.log("Listening on port 3000 !!");
})