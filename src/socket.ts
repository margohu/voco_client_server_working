import logger from "./util/logger";
import { WebSocket, WebSocketServer } from "ws";

export enum SocketType {
    CONNECTION = 'connection',
    MESSAGE = 'message'
}

export interface Chat {
    username: string;
    date: string;
    message: string;
}

export default function socket({ wss }: { wss: WebSocketServer }) {
    logger.info(`Sockets enabled`);

    wss.on(SocketType.CONNECTION, (ws: WebSocket) => {
        ws.on(SocketType.MESSAGE, (message: string) => {
            const data = JSON.parse(message) as Chat;
            data.date = new Date().toISOString();
            //log the received message and send it back to the client. Do not log client credentials out in real world application (ex: email, firstname etc.)
            logger.info('received: %s', JSON.stringify(data));
            ws.send(JSON.stringify(data));
        });
    });
}
