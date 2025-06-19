import { Icone } from "./iconeModel";

export class Tipo {
    constructor(
        public id: number,
        public nome: string,
        public icone: Icone | null,
        public dataCriacao: Date,
        public dataAlteracao: Date
    ) {}
}