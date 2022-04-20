import express from 'express';
import {createServer} from "http";
import {Application} from "express/ts4.0";
import logger from "./util/logger";
import socket from "./socket";
import {WebSocketServer} from "ws";
import cors from 'cors';

const app: Application = express();

const PORT: number = 1337 || parseInt(process.env.PORT as string, 10);

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(express.json());

app.use(cors(options));


const httpServer = createServer(app);

const wss = new WebSocketServer({port: 4000});

httpServer.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
    socket({wss});
});
