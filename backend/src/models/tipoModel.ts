import { EntidadeGenerica } from "./entidadeGenerica"
import { Icone } from "./iconeModel"

export class Tipo extends EntidadeGenerica {
    private nome: string
    private icone: Icone | null
    
    constructor(id: number, dataCriacao: Date, dataAlteracao: Date, nome: string, icone: Icone | null) {
        super(id, dataCriacao, dataAlteracao)
        this.nome = nome
        this.icone = icone
    }

    public getNome(): string {
        return this.nome
    }

    public setNome(nome: string): void {
        this.nome = nome
    }

    public getIcone(): Icone | null {
        return this.icone
    }

    public setIcone(icone: Icone | null): void {
        this.icone = icone
    }
}
