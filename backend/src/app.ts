import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/apiRoutes';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use('/api', apiRoutes);

    return app;
}