import { Request, Response } from 'express'
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
            res.status(500).json({ erro: `Erro ao buscar transações: ${error}` })
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
            else res.status(404).json({ erro: 'Transação não encontrada.' })
        } catch(error) {
            res.status(500).json({ erro: `Erro ao buscar a transação: ${error}` })
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
            const transacao = await this.transacaoService.getTransacoesPorMes(mes)
            if(transacao) res.json(transacao)
            else res.status(404).json({ erro: 'Transações não encontradas. '})
        } catch (error) {
            res.status(500).json({ erro: `Erro ao buscar as transações: ${error}`})
        }
    }
}
