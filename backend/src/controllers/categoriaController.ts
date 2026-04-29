import { Request, Response } from "express"
import { ICategoria } from "src/models/categoriaModel"

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
            const id = parseInt(req.params.id as string)
            const categoria = await this.categoriaService.getCategoriaPorId(id)
            if (categoria) res.json(categoria)
            else res.status(404).json({ error: 'Categoria não encontrada.' })
        } catch(error) {
            res.status(500).json({ erro: `Erro ao buscar a categoria: ${error}` })
        }
    }

    async getCategoriaPorIdTipo(req: Request, res: Response): Promise<void> {
        try {
            const idTipo = parseInt(req.params.id_tipo as string)
            const categoria = await this.categoriaService.getCategoriasPorIdTipo(idTipo)
            if(categoria) res.json(categoria)
            else res.status(404).json({ erro: 'Categoria não encontrada.' })
        } catch(error) {
            res.status(500).json({ erro: `Erro ao buscar a categoria: ${error}` })
        }
    }

    async setCategorias(req: Request, res: Response): Promise<void> {
        try {
            const data: ICategoria[] = req.body
            await this.categoriaService.salvaCategorias(data)

            const categorias = await this.categoriaService.getAllCategorias()
            res.json(categorias)
        } catch (error) {
            console.error(error)
            res.status(500).json({message: 'Erro ao processar dados de Categorias'})
        }
    }

    async deleteCategoriaPorId(req: Request, res:Response): Promise<void> {
        try {
            const id = parseInt(req.params.id as string)
            await this.categoriaService.deletaCategoria(id)

            const categorias = await this.categoriaService.getAllCategorias()
            res.json(categorias)
        } catch (error) {
            console.error(error)
            res.status(500).json({message: 'Erro ao processar dados de Categorias'})
        }
    }
}
