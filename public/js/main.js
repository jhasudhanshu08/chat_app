const chatForm = document.getElementById("chat-form");

const socket = io();

socket.on("message", (message) => {
    console.log(message);
})

//submitting of message
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get message as a text
    const msg = e.target.elements.msg.value;
    console.log(msg);

    //emit to the server
    socket.emit("chatMessage", msg);
})