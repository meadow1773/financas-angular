import { inject, Injectable } from "@angular/core"
import { catchError, map, Observable, tap } from "rxjs"

import { Store } from "../Store"
import { IconesState } from "./icones.state"
import { ApiService } from "../../api.service"
import { LoadingService } from "../../loading.service"

@Injectable({
    providedIn: 'root'
})
export class IconesStore extends Store<IconesState> {
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
     * Construtor da classe IconesStore
     */
    constructor() {
        super(new IconesState())
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
     * Carrega todos os ícones
     */
    carregarIcones() {
        this.setInitalLoading()

        return this.api.getIcones().pipe(
            tap(icones => {
                const newState = new IconesState()
                newState.setIcones(icones)
                newState.setLoading(false)
                this.setState(newState)
            }),
            catchError(error => {
                const errorState = new IconesState()
                errorState.setErros(error)
                errorState.setLoading(false)
                this.setState(errorState)
                throw new Error(error)
            })
        )
    }
}