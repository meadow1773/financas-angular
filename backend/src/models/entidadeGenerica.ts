export class EntidadeGenerica {
    private id?: number
    private dataCriacao?: Date
    private dataAlteracao?: Date

    constructor (id?: number, dataCriacao?: Date, dataAlteracao?: Date) {
        this.id = id
        this.dataCriacao = dataCriacao
        this.dataAlteracao = dataAlteracao
    }

    public getId(): number | undefined {
        return this.id
    }

    public getDataCriacao(): Date | undefined {
        return this.dataCriacao
    }

    public getDataAlteracao(): Date | undefined {
        return this.dataAlteracao
    }
}