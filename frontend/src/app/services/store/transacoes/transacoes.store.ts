import { inject, Injectable } from "@angular/core"
import { catchError, map, Observable, tap } from "rxjs"

import { Store } from "../Store"
import { ListaTransacoes, TransacoesState } from "./transacoes.state"
import { DataRequest } from "../../../../interfaces/dataRequest"
import { Transacao } from "../../../../interfaces/models"
import { ApiService } from "../../api.service"
import { LoadingService } from "../../loading.service"

@Injectable({
    providedIn: 'root'
})
export class TransacoesStore extends Store<TransacoesState> {
    /**
     * Injeção do serviço de API
     */
    private api = inject(ApiService)

    /**
     * Injeção do serviço de loading
     */
    private loadingService = inject(LoadingService)

    /**
     * Observable que indica o estado de loading
     */
    loading$: Observable<boolean> = this.state$.pipe(
        map(state => state.getLoading())
    )

    /**
     * Construtor da classe TransacoesStore
     */
    constructor() {
        super(new TransacoesState())
        this.loadingService.addLoading(this.loading$)
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
                throw new Error(error)
            })
        )
    }

    /**
     * Carrega todas as transações de um mês
     * @param mes 
     * @returns 
     */
    carregarTransacoesPorMes(mes: number) {
        this.setInitalLoading()

        return this.api.getTransacoesPorMes(mes).pipe(
            tap(transacoes => {
                const newState = this.stateSnapshot
                const listaTransacoes = this.zerarTransacoes()
                transacoes.forEach(transacao => {
                    listaTransacoes[transacao.nomeCategoria] = 
                        listaTransacoes[transacao.nomeCategoria] || []
                    listaTransacoes[transacao.nomeCategoria].push(transacao)
                })
                newState.setTransacoes(listaTransacoes)
                newState.setLoading(false)
                this.setState(newState)
            }),
            catchError(error => {
                const errorState = this.stateSnapshot
                errorState.setErros(error)
                errorState.setLoading(false)
                this.setState(errorState)
                throw new Error(error)
            })
        )
    }

    /**
     * Envia transações para o backend
     * @param dataRequest
     * @returns
     */
    enviarTransacoes(dataRequest: DataRequest[]) {
        this.setInitalLoading()

        return this.api.setTransacoes(dataRequest).pipe(
            tap((response) => {
                const newState = this.stateSnapshot
                const listaTransacoes = this.stateSnapshot.getTransacoes()
                dataRequest.forEach(data => {
                    const transacoesAtuais = listaTransacoes[data.categoria] || []
                    const novasTransacoes: Transacao[] = (response as Transacao[])
                        .filter(transacao => transacao.nomeCategoria === data.categoria)
                    listaTransacoes[data.categoria] = [...transacoesAtuais, ...novasTransacoes]
                })
                newState.setTransacoes(listaTransacoes)
                newState.setLoading(false)
                this.setState(newState)
            }),
            catchError(error => {
                const errorState = this.stateSnapshot
                errorState.setErros(error)
                errorState.setLoading(false)
                this.setState(errorState)
                throw new Error(error)
            })
        )
    }

    /** 
     * Exclui uma transação pelo ID
     * @param idTransacao 
     * @returns 
     */    
    excluiTransacao(idTransacao: number) {
        this.setInitalLoading()

        return this.api.deleteTransacaoPorId(idTransacao).pipe(
            tap(() => {
                const newState = this.stateSnapshot
                const listaTransacoes = newState.getTransacoes()
                for (const categoria in listaTransacoes) {
                    const novaLista = listaTransacoes[categoria]
                        .filter(trans => trans.id !== idTransacao)
                    listaTransacoes[categoria] = novaLista
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
                throw new Error(error)
            })
        )
    }
}