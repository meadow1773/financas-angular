export interface DataRequest {
    categoria: string;
    mes: number;
    ano: number;
    valores: number[];
    descricao: string[];
    dataCadastro: Date;
}