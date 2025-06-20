import { Request, Response } from "express"
import { TipoService } from "../services/tipoService"

export class TipoController {
    private tipoService: TipoService

    constructor() {
        this.tipoService = new TipoService()
    }

    // Getters para Tipos.
    async getTipos(req: Request, res: Response): Promise<void> {
        try {
            const tipos = await this.tipoService.getAllTipos()
            res.json(tipos)
        } catch(error) {
            res.status(500).json({ error: `Erro ao buscar tipos: ${error}`})
        }
    }

    async getTipoPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const tipo = await this.tipoService.getTipoPorId(id)
            if (tipo) res.json(tipo)
            else res.status(404).json({ error: 'Tipo não encontrado.' })
        } catch(error) {
            res.status(500).json({ error: `Erro ao buscar o tipo: ${error}` })
        }
    }

}
