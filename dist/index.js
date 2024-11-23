"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
// event handler
wss.on("connection", function (socket) {
    console.log("User connected");
    setInterval(() => {
        socket.send(JSON.stringify({ message: "Hello, client!" }));
    });
    socket.on("message", (e) => {
        console.log(e.toString());
    });
});
