import { createApp } from "./app";
import dotenv from 'dotenv';

dotenv.config();

process.on('uncaughtException', (error) => {
    console.error('Uncaught Excepction:', error);
})
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
})

const PORT = process.env.PORT;
const app = createApp();

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});