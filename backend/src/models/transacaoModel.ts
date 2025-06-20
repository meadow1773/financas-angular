import { Categoria } from "./categoriaModel"

export class Transacao {
    constructor(
        public id: number,
        public categoria: Categoria,
        public mes: number,
        public ano: number,
        public valor: number,
        public dataCriacao: Date,
        public dataAlteracao: Date
    ) { }
}
