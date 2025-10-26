import { inject, Injectable } from "@angular/core"
import { catchError, tap } from "rxjs"

import { Store } from "../Store"
import { CategoriasState, ListaCategorias } from "./categorias.state"
import { ApiService } from "../../api.service"

@Injectable({
    providedIn: 'root'
})
export class CategoriasStore extends Store<CategoriasState> {
    /**
     * Injeção do serviço de API
     */
    private api = inject(ApiService)

    /**
     * Construtor da classe CategoriasState
     */
    constructor() {
        super(new CategoriasState())
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
                const listaCategorias: ListaCategorias = {}
                listaCategorias[categorias[0].tipo] = categorias
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