import { inject, Injectable } from "@angular/core"
import { catchError, map, Observable, tap } from "rxjs"

import { Store } from "../Store"
import { CategoriasState, ListaCategorias } from "./categorias.state"
import { Categoria } from "../../../../interfaces/models"
import { ApiService } from "../../api.service"
import { LoadingService } from "../../loading.service"

@Injectable({
    providedIn: 'root'
})
export class CategoriasStore extends Store<CategoriasState> {
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
     * Construtor da classe CategoriasState
     */
    constructor() {
        super(new CategoriasState())
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
     * Carrega as categorias a partir do id de um tipo
     * @param idTipo 
     * @returns 
     */
    carregarCategorias(idTipo: number) {
        this.setInitalLoading()

        return this.api.getCategoriasPorIdTipo(idTipo).pipe(
            tap(categorias => {
                const newState = this.stateSnapshot
                const listaCategorias: ListaCategorias = newState.getCategorias()
                categorias.forEach(cat => {
                    (listaCategorias[cat.nomeTipo] ??= []).push(cat)
                })
                newState.setCategorias(listaCategorias)
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
     * Envia as categorias para o backend
     * @param categorias
     */
    enviarCategorias(categorias: Categoria[]) {
        this.setInitalLoading()

        return this.api.setCategorias(categorias).pipe(
            tap(novasCategorias => {
                const newState = this.stateSnapshot
                const listaCategorias: ListaCategorias = newState.getCategorias()
                novasCategorias.forEach(cat => {
                    (listaCategorias[cat.nomeTipo] ??= []).push(cat)
                })
                newState.setCategorias(listaCategorias)
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