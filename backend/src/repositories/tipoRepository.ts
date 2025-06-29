import { IconeRepository } from "./iconeRepository"
import { pool } from "../config/database"
import { Tipo } from "../models/tipoModel"

export class TipoRepository {
    private iconeRepository = new IconeRepository()

    async retornaTodos(): Promise<Tipo[]> {
        const query = `SELECT * FROM tipos`
        const { rows } = await pool.query(query)

        const tipos = Promise.all(rows.map(async row => {
            let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
            if (!icone) icone = await this.iconeRepository.retornaPorId(1)

            return new Tipo(
                row.id,
                row.nome,
                icone,
                row.data_cadastro,
                row.data_alteracao
            )
        }))
        return tipos
    }

    async retornaPorId(id: number): Promise<Tipo | null> {
        const query = `SELECT * FROM tipos WHERE id = $1`
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) return null
        const row = rows[0]

        let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
        if (!icone) icone = await this.iconeRepository.retornaPorId(1)

        return new Tipo(
            row.id,
            row.nome,
            icone,
            row.data_cadastro,
            row.data_alteracao
        )
    }
}
