import { Client } from 'pg'
import 'dotenv/config'

export class Database {
    private client: Client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: 5334,
        database: process.env.DB_NAME
    })
    /**
     * 
     */
    constructor() {
        this.setConnection()
    }
    /**
     * Método que realiza a conexão com o banco de dados
     */
    private async setConnection() {
        await this.client.connect().then(res => {
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    }
}