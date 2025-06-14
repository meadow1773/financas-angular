import { pool } from "../config/database";
import dotenv from 'dotenv';
import { Transacao } from "../models/transacaoModel";

dotenv.config();

export class TransacaoRepository {
    async retornaTodos(): Promise<Transacao[]> {
        const query = `SELECT * FROM ${process.env.DB_NAME}.transacoes`;
        const { rows } = await pool.query(query);

        return rows.map(row => new Transacao(
            row.id,
            row.categoria,
            row.mes,
            row.ano,
            row.valor,
            row.dataCriacao,
            row.dataAlteracao
        ));
    }

    async retornaPorId(id: number): Promise<Transacao | null> {
        const query = `SELECT * FROM ${process.env.DB_NAME}.transacoes WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        
        if (rows.length === 0) return null;

        const row = rows[0];
        return new Transacao(
            row.id,
            row.categoria,
            row.mes,
            row.ano,
            row.valor,
            row.dataCriacao,
            row.dataAlteracao
        );
    }
}