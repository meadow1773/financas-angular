// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
// Gerado automaticamente em: 2025-10-12T18:58:47.662Z
export interface Categoria {
    id: number;
    nome: string;
    tipo: string;
    icone: Icone;
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
    categoria: string;
    mes: number;
    ano: number;
    valor: number;
    descricao: string;
    dataCriacao: Date;
    id?: number | undefined;
    dataAlteracao?: Date | undefined;
}
