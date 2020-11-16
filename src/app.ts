import "reflect-metadata";
import express from 'express';
import container from "./config/inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";

import './controller/client.controller';
import morgan from "morgan"

const server = new InversifyExpressServer(container, null, { rootPath: "/api/v1" });

server.setErrorConfig((app) => {
    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        console.error(err.stack + "test");
        res.status(500).send('Something broke!');
    });
});
server.setConfig((app) => {
    const logger = morgan('combined');
    app.use(logger);
});

server.build().listen(3002, '0.0.0.0',() => console.log(`Server on!!`));
