import { pool } from "../config/database";
import { Transacao } from "../models/transacaoModel";
import { CategoriaRepository } from "./categoriaRepository";

export class TransacaoRepository {
    private categoriaRepository = new CategoriaRepository();

    async retornaTodos(): Promise<Transacao[]> {
        const query = `SELECT * FROM transacoes`;
        const { rows } = await pool.query(query);
        const transacoes = Promise.all(rows.map(async row => {
            const categoria = await this.categoriaRepository.retornaPorId(row.fk_categoria_id);
            if (!categoria) throw new Error(`Categoria não encontrada para a transação ${row.id}`);
            return new Transacao(
                row.id,
                categoria,
                row.mes,
                row.ano,
                row.valor,
                row.data_cadastro,
                row.data_alteracao
            );
        }));
        return transacoes;
    }

    async retornaPorId(id: number): Promise<Transacao | null> {
        const query = `SELECT * FROM transacoes WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        const categoria = await this.categoriaRepository.retornaPorId(row.fk_categoria_id);
        if (!categoria) throw new Error(`Categoria não encontrada para a transação ${row.id}`);
        return new Transacao(
            row.id,
            categoria,
            row.mes,
            row.ano,
            row.valor,
            row.data_cadastro,
            row.data_alteracao
        );
    }
}