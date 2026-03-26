import { EntidadeGenerica } from "./entidadeGenerica"
import { Icone, IIcone } from "./iconeModel"

export interface ICategoria {
    nome: string;
    nomeTipo: string;
    icone: IIcone;
    id: number;
    dataCriacao: Date;
    dataAlteracao: Date;
}

export class Categoria extends EntidadeGenerica{
    private nome: string
    private nomeTipo: string
    private icone: Icone

    constructor(nome: string,  nomeTipo: string, icone: Icone, id?: number, 
        dataCriacao?: Date, dataAlteracao?: Date
    ) {
        super(id, dataCriacao, dataAlteracao)
        this.nome = nome
        this.nomeTipo = nomeTipo
        this.icone = icone
    }

    public getNome(): string {
        return this.nome
    }

    public setNome(nome: string): void {
        this.nome = nome
    }

    public getNomeTipo(): string {
        return this.nomeTipo
    }

    public setNomeTipo(nomeTipo: string): void {
        this.nomeTipo = nomeTipo
    }

    public getIcone(): Icone {
        return this.icone
    }

    public setIcone(icone: Icone): void {
        this.icone = icone
    }
}
