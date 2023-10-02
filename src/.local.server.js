import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {});
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
    ws.on("message", (data, isBinary) => {
        const message = isBinary ? data : data.toString();
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN && ws !== client) {
                client.send(message);
            }
        });
    });
});
