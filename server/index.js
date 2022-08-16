import express from 'express';
import http from 'http';
import { ChatSocket } from './ChatSocket.js';

const app = express();
app.use(express.json());
const server = http.createServer(app);
new ChatSocket(server);

server.listen(3000, () => console.log('Server started on port 3000'));


