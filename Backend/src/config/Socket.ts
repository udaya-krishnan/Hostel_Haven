import {Server as SocketServer} from 'socket.io'
import { Server as HttpServer } from "http";

let io:SocketServer;

const configSocketIo=(server:HttpServer)=>{
    io = new SocketServer(server, {
        cors: {
           origin: "https://hostel-haven.vercel.app/",
           methods: ["GET", "POST"],
        },
     });
}

export {configSocketIo, io};