import { pool } from "../config/database";
import dotenv from 'dotenv';
import { Categoria } from "../models/categoriaModel";

dotenv.config();

export class CategoriaRepository {
    async retornaTodos(): Promise<Categoria[]> {
        const query = `SELECT * FROM ${process.env.DB_NAME}.categorias`;
        const { rows } = await pool.query(query);
        return rows.map(row => new Categoria(
            row.id,
            row.nome,
            row.tipo,
            row.dataCriacao,
            row.dataAlteracao
        ));
    }

    async retornaPorId(id: number): Promise<Categoria | null> {
        const query = `SELECT * FROM ${process.env.DB_NAME}.categorias WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Categoria(
            row.id,
            row.nome,
            row.tipo,
            row.dataCriacao,
            row.dataAlteracao
        )
    }
}