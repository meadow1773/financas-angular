import { BehaviorSubject, Observable } from "rxjs"

/**
 * Classe genérica de Store para gerenciamento de estado
 */
export class Store<T> {
    /**
     * Estado observável
     */
    state$: Observable<T>

    /**
     * Estado manipulável apenas pela store
     */
    private _state$: BehaviorSubject<T>

    /**
     * Construtor genérico da classe Store
     * @param initialState 
     */
    protected constructor (initialState: T) {
        this._state$ = new BehaviorSubject(initialState)
        this.state$ = this._state$.asObservable()
    }

    /**
     * Retorna o snapshot atual do estado
     */
    get stateSnapshot (): T {
        return this._state$.getValue()
    }

    /**
     * Atualiza o estado da store
     * @param nextState 
     */
    setState(nextState: T) {
        this._state$.next(nextState)
    }
}