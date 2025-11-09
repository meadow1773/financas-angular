import { Request, Response } from 'express'
import { TransacaoRequestData } from 'src/models/interfaces/transacaoRequestData'

import { TransacaoService } from "../services/transacaoService"

export class TransacaoController {
    /**
     * Instância do serviço de Transação.
     */
    private transacaoService = new TransacaoService()

    /**
     * Getter para todas as Transações.
     * @param req 
     * @param res 
     */
    async getTransacoes(req: Request, res: Response): Promise<void> {
        try {
            const transacoes = await this.transacaoService.getAllTransacoes()
            res.json(transacoes)
        } catch(error) {
            res.status(500).json({ message: `Erro ao buscar transações: ${error}` })
        }
    }

    /**
     * Getter de Transação por ID.
     * @param req 
     * @param res 
     */
    async getTransacaoPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const transacao = await this.transacaoService.getTransacaoPorId(id)
            if (transacao) res.json(transacao)
            else res.status(404).json({ message: 'Transação não encontrada.' })
        } catch(error) {
            res.status(500).json({ message: `Erro ao buscar a transação: ${error}` })
        }
    }

    /**
     * Getter de Transações por Mês.
     * @param req 
     * @param res 
     */
    async getTransacoesPorMes(req: Request, res: Response): Promise<void> {
        try {
            const mes = parseInt(req.params.mes)
            const categoria = req.query.categoria as string
            const transacao = await this.transacaoService.getTransacoesPorMes(mes, categoria)
            if (transacao) res.json(transacao)
            else res.status(404).json({ message: 'Transações não encontradas. '})
        } catch (error) {
            res.status(500).json({ message: `Erro ao buscar as transações: ${error}`})
        }
    }

    /**
     * Setter de Trasações.
     * @param req 
     * @param res 
     */
    async setTransacoes(req: Request, res: Response): Promise<void> {
        try {
            const data: TransacaoRequestData[] = req.body
            await this.transacaoService.setTransacoes(data)

            res.status(201).json({ message: 'Dados recebidos com sucesso' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Erro ao processar os dados' })
        }        
    }

    /**
     * Deleta uma Transação por ID.
     * @param req 
     * @param res 
     */
    async deleteTransacaoPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            await this.transacaoService.deletaTransacao(id)

            res.status(204).json({ message: 'Dados removidos com sucesso' })
        } catch (error) {
            res.status(500).json({ message: `Erro ao deletar a transação: ${error}` })
        }
    }
}
