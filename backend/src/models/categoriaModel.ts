import { Tipo } from "./tipoModel";

export class Categoria {
    constructor(
        public id: number,
        public nome: string,
        public tipo: Tipo,
        public dataCadastro: Date,
        public dataAlteracao: Date
    ) { }
}