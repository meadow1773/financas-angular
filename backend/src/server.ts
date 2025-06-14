import { createApp } from "./app";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const app = createApp();

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});