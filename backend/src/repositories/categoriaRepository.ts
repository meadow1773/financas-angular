import { pool } from "../config/database";
import { Categoria } from "../models/categoriaModel";

export class CategoriaRepository {
    async retornaTodos(): Promise<Categoria[]> {
        const query = `SELECT * FROM categorias`;
        const { rows } = await pool.query(query);
        return rows.map(row => new Categoria(
            row.id,
            row.nome,
            row.fk_tipo_id,
            row.data_cadastro,
            row.data_alteracao
        ));
    }

    async retornaPorId(id: number): Promise<Categoria | null> {
        const query = `SELECT * FROM categorias WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Categoria(
            row.id,
            row.nome,
            row.tipo,
            row.data_cadastro,
            row.data_alteracao
        );
    }
}