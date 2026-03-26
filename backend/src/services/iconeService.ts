import { Icone } from "../models/iconeModel"
import { IconeRepository } from "../repositories/iconeRepository"

export class IconeService {
    /**
     * Instância do repositório de ícones.
     */
    private repository = new IconeRepository()

    /**
     * Método para obter todos os ícones.
     * @returns 
     */
    async getAllIcones(): Promise<Icone[]> {
        try {
            const icones = await this.repository.retornaTodos()
            return icones
        } catch(error) {
            console.error('Erro no serviço ao buscar icones:', error)
            throw new Error('Falha ao obter icones')
        }
    }
}
