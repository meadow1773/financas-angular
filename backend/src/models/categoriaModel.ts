import { Icone } from "./iconeModel"

export class Categoria {
    constructor(
        public id: number,
        public nome: string,
        public tipo: string,
        public icone: Icone,
        public dataCadastro: Date,
        public dataAlteracao: Date
    ) { }
}
