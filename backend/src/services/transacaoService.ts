import { Transacao } from "../models/transacaoModel"
import { TransacaoRepository } from "../repositories/transacaoRepository"

export class TransacaoService {
    private repository: TransacaoRepository

    constructor() {
        this.repository = new TransacaoRepository()
    }

    async getAllTransacoes(): Promise<Transacao[]> {
        try {
            const transacoes = await this.repository.retornaTodos()
            return transacoes
        } catch(error) {
            console.error('Erro no serviço ao buscar transações:', error)
            throw new Error('Falha ao obter transações')
        }
    }

    async getTransacaoPorId(id: number): Promise<Transacao | null> {
        try {
            const transacao = await this.repository.retornaPorId(id)
            return transacao
        } catch(error) {
            console.error(`Erro no serviço ao buscar transações com o ID ${id}:`, error)
            throw new Error(`Falha ao obter entidade com ID ${id}`)
        }
    }
}
