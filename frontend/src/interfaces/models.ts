// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Gerado automaticamente em: 2025-06-19T17:09:31.703Z
export interface Categoria {
    id: number;
    nome: string;
    tipo: Tipo;
    icone: Icone | null;
    dataCadastro: Date;
    dataAlteracao: Date;
}

export interface Icone {
    id: number;
    link: string;
    matIcons: boolean;
    dataCadastro: Date;
    dataAlteracao: Date;
}

export interface Tipo {
    id: number;
    nome: string;
    icone: Icone | null;
    dataCriacao: Date;
    dataAlteracao: Date;
}

export interface Transacao {
    id: number;
    categoria: Categoria;
    mes: number;
    ano: number;
    valor: number;
    dataCriacao: Date;
    dataAlteracao: Date;
}
