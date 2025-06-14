import { Request, Response } from 'express';
import { TransacaoService } from "../services/transacaoService";
import { CategoriaService } from "../services/categoriaService";
import { TipoService } from "../services/tipoService";

export class ApiController {
    private transacaoService: TransacaoService;
    private categoriaService: CategoriaService;
    private tipoService: TipoService;

    constructor() {
        this.transacaoService = new TransacaoService();
        this.categoriaService = new CategoriaService();
        this.tipoService = new TipoService();
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

    async getTransacoesPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const transacao = await this.transacaoService.getTransacaoPorId(id);
            if (transacao) res.json(transacao)
            else res.status(404).json({ error: 'Transação não encontrada.' });
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar transação.' });
        }
    }

    // Getters para Categorias.
    async getCategorias(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await this.categoriaService.getAllCategorias();
            res.json(categorias);
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar categorias. '});
        }
    }

    async getCategoriasPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const categoria = await this.categoriaService.getCategoriaPorId(id);
            if (categoria) res.json(categoria)
            else res.status(404).json({ error: 'Categoria não encontrada.' });
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar categoria.' });
        }
    }

    // Getters para Tipos.
    async getTipos(req: Request, res: Response): Promise<void> {
        try {
            const tipos = await this.tipoService.getAllTipos();
            res.json(tipos);
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar tipos. '});
        }
    }

    async getTipoPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const tipo = await this.tipoService.getTipoPorId(id);
            if (tipo) res.json(tipo)
            else res.status(404).json({ error: 'Tipo não encontrado.' });
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar tipo.' });
        }
    }
}