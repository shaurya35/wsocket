import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

// let allSockets = {};

interface User{
    socket: WebSocket;
    room: String;
}

let allSockets: User[] = [];


wss.on("connection", (socket) => {
    
    socket.on("message", (message) => {
        const parseMessage = JSON.parse(message);
        if(parseMessage.type == "join"){
            allSockets.push({
                socket,
                room: parseMessage.payload.roomId
            })
        }
        
    })

    socket.on("disconnect", () => {
        allSockets = allSockets.filter(x => x != socket);

    })
})

