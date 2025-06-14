import { Categoria } from "./categoriaModel";

export class Transacao {
    constructor(
        id: number,
        categoria: Categoria,
        mes: number,
        ano: number,
        valor: number,
        dataCriacao: Date,
        dataAlteracao: Date
    ) { }
}