import express from 'express';
import {createServer} from "http";
import {Application} from "express/ts4.0";
import logger from "./util/logger";
import socket from "./socket";
import {WebSocketServer} from "ws";

const app: Application = express();

const PORT: number = 1337 || parseInt(process.env.PORT as string, 10);


const httpServer = createServer(app);

const wss = new WebSocketServer({port: 4000});

httpServer.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
    socket({wss});
});
