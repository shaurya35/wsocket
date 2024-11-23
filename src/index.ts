import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// event handler
wss.on("connection", function(socket){
    console.log("User connected")
    setInterval(() => {
        socket.send(JSON.stringify({ message: "Hello, client!" }));
    })

    socket.on("message", (e) => {
        console.log(e.toString());
    })
})