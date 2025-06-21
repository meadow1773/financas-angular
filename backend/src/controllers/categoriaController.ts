import { Request, Response } from "express"
import { CategoriaService } from "../services/categoriaService"

export class CategoriaController {
    private categoriaService = new CategoriaService()

    // Getters para Categorias.
    async getCategorias(req: Request, res: Response): Promise<void> {
        try {
            const categorias = await this.categoriaService.getAllCategorias()
            res.json(categorias)
        } catch(error) {
            res.status(500).json({ erro: `Erro ao buscar categorias: ${error}` })
        }
    }

    async getCategoriaPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const categoria = await this.categoriaService.getCategoriaPorId(id)
            if (categoria) res.json(categoria)
            else res.status(404).json({ error: 'Categoria não encontrada.' })
        } catch(error) {
            res.status(500).json({ erro: `Erro ao buscar a categoria: ${error}` })
        }
    }

    async getCategoriaPorIdTipo(req: Request, res: Response): Promise<void> {
        try {
            const idTipo = parseInt(req.params.id_tipo)
            const categoria = await this.categoriaService.getCategoriasPorIdTipo(idTipo)
            if(categoria) res.json(categoria)
            else res.status(404).json({ erro: 'Categoria não encontrada.' })
        } catch(error) {
            res.status(500).json({ erro: `Erro ao buscar a categoria: ${error}` })
        }
    }
}
