import { EntidadeGenerica } from "./entidadeGenerica"

export class Transacao extends EntidadeGenerica {
    private nomeCategoria: string
    private mes: number
    private ano: number
    private valor: number
    private descricao: string

    constructor(nomeCategoria: string, mes: number, ano: number, valor: number, 
        descricao: string, id?: number, dataCriacao?: Date, dataAlteracao?: Date
    ) {
        super(id, dataCriacao, dataAlteracao)
        this.nomeCategoria = nomeCategoria
        this.mes = mes
        this.ano = ano
        this.valor = valor
        this.descricao = descricao
    }

    public getNomeCategoria(): string {
        return this.nomeCategoria
    }

    public setNomeCategoria(nomeCategoria: string): void {
        this.nomeCategoria = nomeCategoria
    }

    public getMes(): number {
        return this.mes
    }

    public setMes(mes: number): void {
        this.mes = mes
    }

    public getAno(): number {
        return this.ano
    }

    public setAno(ano: number): void {
        this.ano = ano
    }

    public getValor(): number {
        return this.valor
    }

    public setValor(valor: number): void {
        this.valor = valor
    }

    public getDescricao(): string {
        return this.descricao
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao
    }
}
