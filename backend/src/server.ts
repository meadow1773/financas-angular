import dotenv from 'dotenv'

import { inicializaApp } from "./app"

// Variáveis de ambiente
dotenv.config()

// Tratamento de erros
process.on('uncaughtException', (error) => {
    console.error('Uncaught Excepction:', error)
})
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

// Inicializa o App
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;
const app = inicializaApp()

app.listen(PORT, () => {
    console.info('Servidor rodando com sucesso!')
})
