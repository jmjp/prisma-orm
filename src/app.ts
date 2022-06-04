import express from 'express';
import cors from 'cors';
import { prismaClient } from '../src/database/database';
import routes from './routes';
import logger from './middlewares/HttpLogger';

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(logger);
    }

    private async database(): Promise<void> {
        await prismaClient.$connect()
    }

    private routes(): void {
        this.express.use('/api/v1', routes);
    }
}

export default new App().express;