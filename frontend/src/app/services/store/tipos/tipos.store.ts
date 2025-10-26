import { inject, Injectable } from "@angular/core"
import { catchError, tap } from "rxjs"

import { Store } from "../Store"
import { TiposState } from "./tipos.state"
import { ApiService } from "../../api.service"

@Injectable({
    providedIn: 'root'
})
export class TiposStore extends Store<TiposState> {
    /**
     * Injeção do serviço de API
     */
    private api = inject(ApiService)

    /**
     * Construtor da classe TiposStore
     */
    constructor() {
        super(new TiposState())
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
     * Carrega todos os tipos
     */
    carregarTipos() {
        this.setInitalLoading()

        return this.api.getTipos().pipe(
            tap(tipos => {
                const newState = this.stateSnapshot
                newState.setTipos(tipos)
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