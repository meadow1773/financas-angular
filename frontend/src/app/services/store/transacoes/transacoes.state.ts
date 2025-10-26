import { Transacao } from "../../../../interfaces/models"

export interface ListaTransacoes {
    [categoria: string] : Transacao[];
}

export class TransacoesState {
    private loading: boolean = false
    private erros: Error[] = []
    private transacoes: ListaTransacoes = {}
    
    getLoading() { return this.loading }
    
    getErros() { return this.erros }

    getTransacoes() { return this.transacoes }

    setLoading(loading: boolean) { this.loading = loading }

    setErros(erro: Error) { this.erros.push(erro) }

    setTransacoes(listaTransacoes: ListaTransacoes) { this.transacoes = listaTransacoes }
}