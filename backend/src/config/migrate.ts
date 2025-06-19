import fs from 'fs/promises';
import path from 'path';
import { pool } from './database';

const pastaMigrations = path.join(process.cwd(), 'db');
const nomeTabelaMigrations = 'executed_migrations';

async function criarTabelaMigrationsExecutadas() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS ${nomeTabelaMigrations} (
                id SERIAL PRIMARY KEY,
                migration_name VARCHAR(255) NOT NULL UNIQUE);`
        );
    } catch (error) {
        console.error(`Erro criando tabela de migrations executadas:`, error);
        process.exit(1);
    }
}

async function getMigrationsExecutadas() {
    try {
        const result = await pool.query(`SELECT migration_name FROM ${nomeTabelaMigrations}`);
        return result.rows.map(linha => linha.migration_name);
    } catch (error) {
        console.error('Erro buscando migrations executadas:', error);
        process.exit(1);
    }
}

async function executarMigration(nomeMigration:string) {
    try {
        const caminhoMigration = path.join(pastaMigrations, nomeMigration);
        const sql = await fs.readFile(caminhoMigration, 'utf8');
        await pool.query(sql);
        await pool.query(`INSERT INTO ${nomeTabelaMigrations} (migration_name) VALUES ($1)`, [nomeMigration]);
        console.log(`Migration '${nomeMigration}' executado com sucesso.`)
    } catch (error) {
        console.error(`Erro executando o migration ${nomeMigration}:`, error);
        process.exit(1);
    }
}

async function runMigrations() {
    try {
        console.log('Iniciando os migrations...')
        await criarTabelaMigrationsExecutadas();
        const migrationsExecutadas = await getMigrationsExecutadas();
        const arquivosMigration = await fs.readdir(pastaMigrations);
        const arquivosSql = arquivosMigration
            .filter(arquivo => arquivo.endsWith('.sql'))
            .sort((a, b) => a.localeCompare(b));

        for (const nomeMigration of arquivosSql) {
            if (!migrationsExecutadas.includes(nomeMigration)) {
                await executarMigration(nomeMigration);
            }
        }
    } catch (error) {
        console.error('Erro ao rodar migrations:', error);
        process.exit(1);
    } finally {
        console.log('Migrations finalizados.')
        await pool.end();
    }
}

runMigrations();