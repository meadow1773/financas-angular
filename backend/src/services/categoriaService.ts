import { Categoria } from "../models/categoriaModel"
import { CategoriaRepository } from "../repositories/categoriaRepository"

export class CategoriaService {
    private repository = new CategoriaRepository()

    async getAllCategorias(): Promise<Categoria[]> {
        try {
            const categorias = await this.repository.retornaTodos()
            return categorias
        } catch(error) {
            console.error('Erro no serviço ao buscar categorias:', error)
            throw new Error('Falha ao obter categorias')
        }
    }

    async getCategoriaPorId(id: number): Promise<Categoria | null> {
        try {
            const categoria = await this.repository.retornaPorId(id)
            return categoria
        } catch(error) {
            console.error(`Erro no serviço ao buscar categorias com o ID ${id}:`, error)
            throw new Error(`Falha ao obter categoria com ID ${id}`)
        }
    }

    async getCategoriasPorIdTipo(idTipo: number): Promise<Categoria[]> {
        try {
            const categorias = await this.repository.retornaPorIdTipo(idTipo)
            return categorias
        } catch(error) {
            console.error(`Erro no serviço ao buscar categorias com o tipo de ID ${idTipo}:`, error)
            throw new Error(`Falha ao obter categoria com o tipo de ID ${idTipo}`)
        }
    }
}
