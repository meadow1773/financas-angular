import { Request, Response } from "express";
import { CategoriaService } from "../services/categoriaService";

export class CategoriaController {
    private categoriaService: CategoriaService;

    constructor() {
        this.categoriaService = new CategoriaService();
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

    async getCategoriaPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const categoria = await this.categoriaService.getCategoriaPorId(id);
            if (categoria) res.json(categoria)
            else res.status(404).json({ error: 'Categoria não encontrada.' });
        } catch(error) {
            res.status(500).json({ error: 'Erro ao buscar categoria.' });
        }
    }
}