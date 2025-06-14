import { pool } from "../config/database";
import dotenv from 'dotenv';
import { Tipo } from "../models/tipoModel";

dotenv.config();

export class TipoRepository {
    async retornaTodos(): Promise<Tipo[]> {
        const query = `SELECT * FROM ${process.env.DB_NAME}.tipos`;
        const { rows } = await pool.query(query);
        return rows.map(row => new Tipo(
            row.id,
            row.nome,
            row.dataCriacao,
            row.dataAlteracao
        ));
    }

    async retornaPorId(id: number): Promise<Tipo | null> {
        const query = `SELECT * FROM ${process.env.DB_NAME}.tipos WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Tipo(
            row.id,
            row.nome,
            row.dataCriacao,
            row.dataAlteracao
        )
    }
}