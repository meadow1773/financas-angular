import { pool } from "../config/database"
import { Icone } from "../models/iconeModel"


export class IconeRepository {
    /**
     * Método que retorna todos os ícones.
     * @returns Promessa resolvida em um array de Ícone.
     */
    async retornaTodos(): Promise<Icone[]> {
        const query = `SELECT * FROM icones`
        const { rows } = await pool.query(query)
        return rows.map(row => new Icone(
            row.id,
            row.link,
            row.mat_icons,
            row.data_cadastro,
            row.data_alteracao
        ))
    }

    /**
     * Retorna o Ícone de um determinado ID.
     * @param id 
     * @returns Promessa resolvida em um Ícone ou nulo se não encontrada.
     */
    async retornaPorId(id: number): Promise<Icone | null> {
        const query = `SELECT * FROM icones WHERE id = $1`
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) return null
        const row = rows[0]
        return new Icone(
            row.id,
            row.link,
            row.mat_icons,
            row.data_cadastro,
            row.data_alteracao
        )
    }
}
