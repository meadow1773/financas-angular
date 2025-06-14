import { Tipo } from "./tipoModel";

export class Categoria {
    constructor(
        id: number,
        nome: string,
        tipo: Tipo,
        dataCriacao: Date,
        dataAlteracao: Date
    ) { }
}