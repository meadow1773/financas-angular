import { pool } from "../config/database"
import { Categoria } from "../models/categoriaModel"
import { IconeRepository } from "./iconeRepository"
import { TipoRepository } from "./tipoRepository"

export class CategoriaRepository {
    private tipoRepository = new TipoRepository()
    private iconeRepository = new IconeRepository()

    async retornaTodos(): Promise<Categoria[]> {
        const query = `SELECT * FROM categorias`
        const { rows } = await pool.query(query)

        const categorias = Promise.all(rows.map(async row => {
            const tipo = await this.tipoRepository.retornaPorId(row.fk_tipo_id)
            let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
            if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${row.id}`)
            if (!icone) icone = await this.iconeRepository.retornaPorId(1)

            return new Categoria(
                row.id,
                row.nome,
                tipo,
                icone,
                row.data_cadastro,
                row.data_alteracao
            )
        }))
        return categorias
    }

    async retornaPorId(id: number): Promise<Categoria | null> {
        const query = `SELECT * FROM categorias WHERE id = $1`
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) return null
        const row = rows[0]

        const tipo = await this.tipoRepository.retornaPorId(row.fk_tipo_id)
        let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
        if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${row.id}`)
        if(!icone) icone = await this.iconeRepository.retornaPorId(1)

        return new Categoria(
            row.id,
            row.nome,
            tipo,
            icone,
            row.data_cadastro,
            row.data_alteracao
        )
    }
}
