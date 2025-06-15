import { pool } from "../config/database";
import { Tipo } from "../models/tipoModel";

export class TipoRepository {
    async retornaTodos(): Promise<Tipo[]> {
        const query = `SELECT * FROM tipos`;
        const { rows } = await pool.query(query);
        return rows.map(row => new Tipo(
            row.id,
            row.nome,
            row.data_cadastro,
            row.data_alteracao
        ));
    }

    async retornaPorId(id: number): Promise<Tipo | null> {
        const query = `SELECT * FROM tipos WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Tipo(
            row.id,
            row.nome,
            row.data_cadastro,
            row.data_alteracao
        )
    }
}