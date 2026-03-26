import { EntidadeGenerica } from "./entidadeGenerica"

export interface IIcone {
    id: number;
    link: string;
    matIcon: boolean;
    dataCadastro: Date;
    dataAlteracao: Date;
}

export class Icone extends EntidadeGenerica {
    private link: string
    private matIcon: boolean

    constructor(id: number, dataCriacao: Date, dataAlteracao: Date, link: string, 
        matIcon: boolean) {
        super(id, dataCriacao, dataAlteracao)
        this.link = link
        this.matIcon = matIcon
    }

    public getLink(): string {
        return this.link
    }

    public setLink(link: string): void {
        this.link = link
    }

    public isMatIcon(): boolean {
        return this.matIcon
    }

    public setMatIcon(matIcon: boolean): void {
        this.matIcon = matIcon
    }
}
