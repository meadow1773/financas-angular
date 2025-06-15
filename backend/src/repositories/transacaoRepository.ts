import { pool } from "../config/database";
import { Transacao } from "../models/transacaoModel";

export class TransacaoRepository {
    async retornaTodos(): Promise<Transacao[]> {
        const query = `SELECT * FROM transacoes`;
        const { rows } = await pool.query(query);
        return rows.map(row => new Transacao(
            row.id,
            row.categoria,
            row.mes,
            row.ano,
            row.valor,
            row.data_cadastro,
            row.data_alteracao
        ));
    }

    async retornaPorId(id: number): Promise<Transacao | null> {
        const query = `SELECT * FROM transacoes WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        
        if (rows.length === 0) return null;

        const row = rows[0];
        return new Transacao(
            row.id,
            row.categoria,
            row.mes,
            row.ano,
            row.valor,
            row.data_cadastro,
            row.data_alteracao
        );
    }
}