export interface TransacaoRequestData {
    categoria: string;
    mes: number;
    ano: number;
    valores: number[];
    descricao: string,
    dataCadastro: Date;
}