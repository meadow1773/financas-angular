import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'

import { router } from './routes/router'

export function inicializaApp() {
    // Configurações
    const app = express()
    const isProduction = process.env.NODE_ENV  === 'production'

    // Middlewares
    app.use(cors({
        origin: process.env.RENDER_EXTERNAL_URL || 'http://localhost:4200',
        methods: [ 'GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    }))

    app.use(morgan(isProduction ? 'combined' : 'dev'))

    if (isProduction) {
        app.use(helmet());
    }

    // Endpoints da aplicação
    app.use(express.json())
    app.use('/api', router)

    return app
}
