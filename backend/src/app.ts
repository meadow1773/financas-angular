import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { router } from './routes/router'

export function inicializaApp() {
    // Configurações
    const app = express()

    // Middlewares
    app.use(cors({
        origin: 'http://localhost:4200'
    }))
    app.use(morgan('dev'))

    // Endpoints da aplicação
    app.use(express.json())
    app.use('/api', router)

    return app
}
