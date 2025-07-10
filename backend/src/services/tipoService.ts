import { Tipo } from "../models/tipoModel"
import { TipoRepository } from "../repositories/tipoRepository"

export class TipoService {
    private repository = new TipoRepository()

    async getAllTipos(): Promise<Tipo[]> {
        try {
            const tipos = await this.repository.retornaTodos()
            return tipos
        } catch(error) {
            console.error('Erro no serviço ao buscar tipos:', error)
            throw new Error('Falha ao obter tipos')
        }
    }

    async getTipoPorId(id: number): Promise<Tipo | null> {
        try {
            const tipo = await this.repository.retornaPorId(id)
            return tipo
        } catch(error) {
            console.error(`Erro no serviço ao buscar tipos com o ID ${id}:`, error)
            throw new Error(`Falha ao obter tipo com ID ${id}`)
        }
    }
}
