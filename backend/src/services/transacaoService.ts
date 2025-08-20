import { TransacaoRequestData } from "src/models/interfaces/transacaoRequestData"

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
    async getTransacoesPorMes(mes: number, categoria?: string): Promise<Transacao[]> {
        try {
            if (!categoria) categoria = ''
            const transacao = await this.repository.retornaPorMes(mes, categoria)
            return transacao
        } catch (error) {
            console.error(`Erro no serviço ao buscar transações com o mês ${mes}:`, error)
            throw new Error(`Falha ao obter entidade com mês ${mes}`)
        }
    }

    /**
     * Setter para Transações.
     * @param dataRequest 
     */
    async setTransacoes(dataRequest: TransacaoRequestData[]) {
        try {
            const transacoes: Transacao[] = []
            dataRequest.forEach(data => {
                data.valores.forEach((valor, i) => {
                    transacoes.push(new Transacao(
                        data.categoria, 
                        data.mes, 
                        data.ano, 
                        valor, 
                        data.descricao[i], 
                        data.dataCadastro))
                })
            })
            await this.repository.salvaTransacao(transacoes)
        } catch (error) {
            console.error('Erro no serviço de registro de transações,', error)
            throw new Error(`Falha ao registrar entidade.`)
        }
    }
}
