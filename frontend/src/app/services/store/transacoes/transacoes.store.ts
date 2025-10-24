import { inject, Injectable } from "@angular/core"
import { catchError, map, of, tap } from "rxjs"

import { Store } from "../Store"
import { ListaTransacoes, TransacoesState } from "./transacoes.state"
import { ApiService } from "../../api.service"

@Injectable({
    providedIn: 'root'
})
export class TransacoesStore extends Store<TransacoesState> {
    /**
     * Injeção do serviço de API
     */
    private api = inject(ApiService)
   
    /**
     * Construtor da classe TransacoesStore
     */
    constructor() {
        super(new TransacoesState())
    }

    /**
     * Zera as transações mantendo as categorias
     * @returns 
     */
    private zerarTransacoes() {
        const transacoes = this.stateSnapshot.getTransacoes()
        const categorias = Object.keys(transacoes)
        categorias.forEach(cat => {
            transacoes[cat] = []
        })
        return transacoes
    }

    /**
     * Define o estado de loading inicial
     */
    private setInitalLoading() {
        const stateAtual = this.stateSnapshot
        stateAtual.setLoading(true)
        this.setState(stateAtual)
    }

    /**
     * Carrega as transações de um mês e categoria carregadas
     * @param mes 
     * @param categoria 
     * @returns 
     */
    carregarTransacoes(mes: number, categoria: string) {
        this.setInitalLoading()

        return this.api.getTransacoesPorMes(mes, categoria).pipe(
            tap(transacoes => {
                const newState = this.stateSnapshot
                const listaTransacoes: ListaTransacoes = {
                    ...this.stateSnapshot.getTransacoes(),
                    [categoria]: transacoes || []
                }
                newState.setTransacoes(listaTransacoes)
                newState.setLoading(false)
                this.setState(newState)
            }),
            catchError(error => {
                const errorState = this.stateSnapshot
                errorState.setErros(error)
                errorState.setLoading(false)
                this.setState(errorState)
                return of(null)
            }),
            map(() => undefined)
        )
    }

    /**
     * Carrega todas as transações de um mês
     * @param mes 
     * @returns 
     */
    carregarTransacoesPorMes(mes:number) {
        this.setInitalLoading()

        return this.api.getTransacoesPorMes(mes).pipe(
            tap(transacoes => {
                const newState = this.stateSnapshot
                const listaTransacoes: ListaTransacoes = {
                    ...this.zerarTransacoes()
                }
                transacoes.forEach(transacao => {
                    listaTransacoes[transacao.categoria] = listaTransacoes[transacao.categoria] || []
                    listaTransacoes[transacao.categoria].push(transacao)
                })
                newState.setTransacoes(listaTransacoes)
                newState.setLoading(false)
                console.log(newState)
                this.setState(newState)
            }),
            catchError(error => {
                const errorState = this.stateSnapshot
                errorState.setErros(error)
                errorState.setLoading(false)
                this.setState(errorState)
                return of(null)
            }),
            map(() => undefined)
        )
    }
}