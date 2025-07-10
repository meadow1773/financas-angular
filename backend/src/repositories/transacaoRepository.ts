import { CategoriaRepository } from "./categoriaRepository"
import { pool } from "../config/database"
import { Transacao } from "../models/transacaoModel"

export class TransacaoRepository {
    /**
     * Instância do repositório de Categoria.
     */
    private categoriaRepository = new CategoriaRepository()

    /**
     * Método que retorna todas as transações.
     * @returns Promessa resolvida em um array de Transação.
     */
    async retornaTodos(): Promise<Transacao[]> {
        const query = `SELECT * FROM transacoes`
        const { rows } = await pool.query(query)
        const transacoes = Promise.all(rows.map(async row => {
            const categoria = await this.categoriaRepository.retornaPorId(row.fk_categoria_id)
            if (!categoria) throw new Error(`Categoria não encontrada para a transação ${row.id}`)
            return new Transacao(
                categoria.nome,
                row.mes,
                row.ano,
                row.valor,
                row.descricao,
                row.data_cadastro,
                row.id,
                row.data_alteracao
            )
        }))
        return transacoes
    }

    /**
     * Retorna a Transação de um determinado ID.
     * @param id 
     * @returns Promessa resolvida em uma Transação ou nulo se não encontrada.
     */
    async retornaPorId(id: number): Promise<Transacao | null> {
        const query = `SELECT * FROM transacoes WHERE id = $1`
        const { rows } = await pool.query(query, [id])
        if (rows.length === 0) return null
        const row = rows[0]
        const categoria = await this.categoriaRepository.retornaPorId(row.fk_categoria_id)
        if (!categoria) throw new Error(`Categoria não encontrada para a transação ${row.id}`)
        return new Transacao(
            categoria.nome,
            row.mes,
            row.ano,
            row.valor,
            row.descricao,
            row.data_cadastro,
            row.id,
            row.data_alteracao
        )
    }

    /**
     * Retorna as Transações de um determinado mês e categoria como filtro opcional.
     * @param mes 
     * @param categoria
     * @returns Promessa resolvida em um array de Transação.
     */
    async retornaPorMes(mes: number, categoria: string): Promise<Transacao[]> {
        let categoriaQuery = ''
        if (categoria) {
            const categoriaObj = await this.categoriaRepository.retornaPorNome(categoria)
            categoriaQuery = `AND fk_categoria_id = ${categoriaObj?.id}`
        }
        const query = `SELECT * FROM transacoes WHERE mes = $1 ${categoriaQuery}`
        const { rows } = await pool.query(query, [mes])
        const transacoes = Promise.all(rows.map(async row => {
            const categoria = await this.categoriaRepository.retornaPorId(row.fk_categoria_id)
            if (!categoria) throw new Error(`Categoria não encontrada para a transação ${row.id}`)
            return new Transacao(
                categoria.nome,
                row.mes,
                row.ano,
                Number(row.valor),
                row.descricao,
                row.data_cadastro,
                row.id,
                row.data_alteracao
            )
        }))
        return transacoes
    }

    /**
     * Salva as transações recebidas.
     * @param data Array do objeto de Transação.
     */
    async salvaTransacao(data: Transacao[]): Promise<void> {
        const query = `INSERT INTO transacoes (fk_categoria_id, mes, ano, valor, descricao, data_cadastro)
        VALUES ($1, $2, $3, $4, $5, $6)`
        data.forEach(async transacao => {
            const categoria = await this.categoriaRepository.retornaPorNome(transacao.categoria)
            await pool.query(query, [
                categoria?.id, 
                transacao.mes, 
                transacao.ano, 
                transacao.valor, 
                transacao.descricao, 
                transacao.dataCriacao
            ])
        })
    }
}
