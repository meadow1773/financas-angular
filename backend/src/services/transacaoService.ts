import { Transacao } from "../models/transacaoModel"
import { TransacaoRepository } from "../repositories/transacaoRepository"

export class TransacaoService {
    /**
     * Instância do repositório de Transação.
     */
    private repository = new TransacaoRepository()

    /**
     * Getter para todas as Transações.
     * @returns Promessa resolvida em um array de Transação.
     */
    async getAllTransacoes(): Promise<Transacao[]> {
        try {
            const transacoes = await this.repository.retornaTodos()
            return transacoes
        } catch(error) {
            console.error('Erro no serviço ao buscar transações:', error)
            throw new Error('Falha ao obter transações')
        }
    }

    /**
     * Getter para Transação por ID.
     * @param id 
     * @returns Promessa resolvida em uma Transação ou nulo se não encontrada.
     */
    async getTransacaoPorId(id: number): Promise<Transacao | null> {
        try {
            const transacao = await this.repository.retornaPorId(id)
            return transacao
        } catch(error) {
            console.error(`Erro no serviço ao buscar transações com o ID ${id}:`, error)
            throw new Error(`Falha ao obter entidade com ID ${id}`)
        }
    }

    /**
     * Getter para Transações por ID.
     * @param mes 
     * @returns Promessa resolvida em um array de Transação.
     */
    async getTransacoesPorMes(mes: number): Promise<Transacao[]> {
        try {
            const transacao = await this.repository.retornaPorMes(mes)
            return transacao
        } catch (error) {
            console.error(`Erro no serviço ao buscar transações com o mês ${mes}:`, error)
            throw new Error(`Falha ao obter entidade com mês ${mes}`)
        }
    }
}
