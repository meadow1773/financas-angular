import { Request, Response } from 'express';
import { TransacaoService } from "../services/transacaoService";

export class TransacaoController {
    private transacaoService: TransacaoService;

    constructor() {
        this.transacaoService = new TransacaoService();
    }
    
    // Getters para Transações.
    async getTransacoes(req: Request, res: Response): Promise<void> {
        try {
            const transacoes = await this.transacaoService.getAllTransacoes();
            res.json(transacoes);
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar transações. '});
        }
    }

    async getTransacaoPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const transacao = await this.transacaoService.getTransacaoPorId(id);
            if (transacao) res.json(transacao)
            else res.status(404).json({ error: 'Transação não encontrada.' });
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar transação.' });
        }
    }
}