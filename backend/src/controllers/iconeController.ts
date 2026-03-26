import { Request, Response } from "express"

import { IconeService } from "../services/iconeService"

export class IconeController {
    /**
     * Instância do serviço de ícones.
     */
    private iconeService = new IconeService()

    /**
     * Getter para todos os ícones.
     * @param req 
     * @param res 
     */
    async getIcones(req: Request, res: Response): Promise<void> {
        try {
            const icones = await this.iconeService.getAllIcones()
            res.json(icones)
        } catch(error) {
            res.status(500).json({ error: `Erro ao buscar icones: ${error}`})
        }
    }
}
