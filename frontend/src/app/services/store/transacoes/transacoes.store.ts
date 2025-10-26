import { inject, Injectable } from "@angular/core"
import { catchError, tap } from "rxjs"

import { Store } from "../Store"
import { ListaTransacoes, TransacoesState } from "./transacoes.state"
import { DataRequest } from "../../../../interfaces/dataRequest"
import { Transacao } from "../../../../interfaces/models"
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
                throw new Error(error)
            })
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
            tap(() => {
                const newState = this.stateSnapshot
                const listaTransacoes: ListaTransacoes = {
                    ...this.stateSnapshot.getTransacoes()
                }
                dataRequest.forEach(data => {
                    const transacoesAtuais = listaTransacoes[data.categoria] || []
                    const novasTransacoes: Transacao[] = 
                        data.valores.map((valor, i) => ({
                            categoria: data.categoria,
                            mes: data.mes,
                            ano: data.ano,
                            valor,
                            descricao: data.descricao[i],
                            dataCriacao: data.dataCadastro,
                        }))
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
}