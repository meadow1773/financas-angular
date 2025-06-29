export class Transacao {
    constructor(
        public categoria: string,
        public mes: number,
        public ano: number,
        public valor: number,
        public descricao: string,
        public dataCriacao: Date,
        public id?: number,
        public dataAlteracao?: Date
    ) { }
}
