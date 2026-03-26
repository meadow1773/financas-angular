import { IconeRepository } from "./iconeRepository"
import { TipoRepository } from "./tipoRepository"
import { pool } from "../config/database"
import { ICategoria, Categoria } from "../models/categoriaModel"

export class CategoriaRepository {
    /**
     * Instância do repositório de Tipo.
     */
    private tipoRepository = new TipoRepository()

    /**
     * Instância do repositório de Ícone.
     */
    private iconeRepository = new IconeRepository()

    /**
     * Método que retorna todas as categorias.
     * @returns Promessa resolvida em um array de Categoria.
     */
    async retornaTodos(): Promise<Categoria[]> {
        const query = `SELECT * FROM categorias`
        const { rows } = await pool.query(query)

        const categorias = Promise.all(rows.map(async row => {
            const tipo = await this.tipoRepository.retornaPorId(row.fk_tipo_id)
            let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
            if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${row.nome}`)
            if (!icone) icone = await this.iconeRepository.retornaPorId(1)

            return new Categoria(
                row.nome,
                tipo.getNome(),
                icone!,
                row.id,
                row.data_cadastro,
                row.data_alteracao,
            )
        }))
        return categorias
    }

    /**
     * Retorna a Categoria de um determinado ID.
     * @param id 
     * @returns Promessa resolvida em uma Categoria ou nulo se não encontrada.
     */
    async retornaPorId(id: number): Promise<Categoria | null> {
        const query = `SELECT * FROM categorias WHERE id = $1`
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) return null
        const row = rows[0]

        const tipo = await this.tipoRepository.retornaPorId(row.fk_tipo_id)
        let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
        if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${row.nome}`)
        if(!icone) icone = await this.iconeRepository.retornaPorId(1)

        return new Categoria(
            row.nome,
            tipo.getNome(),
            icone!,
            row.id,
            row.data_cadastro,
            row.data_alteracao,
        )
    }
    
    /**
     * Retorna a Categoria de um determinado ID de Tipo.
     * @param idTipo 
     * @returns Promessa resolvida em um array Categoria.
    */
    async retornaPorIdTipo(idTipo: number): Promise<Categoria[]> {
        const query = `SELECT * FROM categorias WHERE fk_tipo_id = $1`
        const { rows } = await pool.query(query, [idTipo])

        const categorias = Promise.all(rows.map(async row => {
            const tipo = await this.tipoRepository.retornaPorId(row.fk_tipo_id)
            let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
            if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${row.nome}`)
            if (!icone) icone = await this.iconeRepository.retornaPorId(1)

            return new Categoria(
                row.nome,
                tipo.getNome(),
                icone!,
                row.id,
                row.data_cadastro,
                row.data_alteracao,
            )
        }))
        return categorias
    }
            
    /**
     * Retorna a Categoria de um determinado nome.
     * @param nome 
     * @returns Promessa resolvida em uma Categoria ou nulo se não encontrada.
     */
    async retornaPorNome(nome: string): Promise<Categoria | null> {
        const query = `SELECT * FROM categorias WHERE nome = $1`
        const { rows } = await pool.query(query, [nome])
        if (rows.length === 0) return null
        const row = rows[0]
            
        const tipo = await this.tipoRepository.retornaPorId(row.fk_tipo_id)
        let icone = await this.iconeRepository.retornaPorId(row.fk_icone_id)
        if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${row.nome}`)
        if(!icone) icone = await this.iconeRepository.retornaPorId(1)
            
        return new Categoria(
            row.nome,
            tipo.getNome(),
            icone!,
            row.id,
            row.data_cadastro,
            row.data_alteracao,
        )
    }

    async salvaCategorias(categorias: ICategoria[]): Promise<void> {
        for(const categoria of categorias) {
            const query = `INSERT INTO categorias (nome, fk_tipo_id, fk_icone_id)
                    VALUES ($1, $2, $3)`
            const tipo = await this.tipoRepository.retornaPorNome(categoria.nomeTipo)
            if(!tipo) throw new Error(`Tipo não encontrado para a categoria ${categoria.nome}`)
            
            await pool.query(query, [
                categoria.nome,
                tipo?.getId(),
                categoria.icone?.id,
            ])
        }
    }

    async excluiCategoria(id: number) {
        const query = `DELETE FROM transacoes WHERE id = $1`
        await pool.query(query, [id])
    }
}
        