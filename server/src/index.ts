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
        const parseMessage = JSON.parse(message as unknown as string);

        // join the chatroom
        if(parseMessage.type == "join"){
            allSockets.push({
                socket,
                room: parseMessage.payload.roomId
            })
        }

        // if chat, checks room then send the message
        if(parseMessage.type == "chat"){
            let currentUserRoom = null;
            for(let i = 0; i < allSockets.length; i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].room;
                }
            }
            for(let i = 0; i < allSockets.length; i++ ){
                if(allSockets[i].room == currentUserRoom){
                    allSockets[i].socket.send(parseMessage.payload.message)
                }
            }
        }
        
    })
})

