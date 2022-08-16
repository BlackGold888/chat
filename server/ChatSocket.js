import WebSocket, { WebSocketServer } from 'ws';
import { Client } from './Client.js';

class ChatSocket {
    constructor(server) {
        this.socket = new WebSocketServer({ server });
        this.socket.on('connection', this.connectionHandler);
    }

    connectionHandler = (client) => {
        client.on('message', (data) => {
            const parsed = JSON.parse(data);
            const { eventName, payload } = parsed;
            client.emit(eventName, payload);
        });

        new Client(this.socket, client);
    };
}

export { ChatSocket };
