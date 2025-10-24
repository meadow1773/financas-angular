import { BehaviorSubject, Observable } from "rxjs"

export class Store<T> {
    state$: Observable<T>
    private _state$: BehaviorSubject<T>

    protected constructor (initialState: T) {
        this._state$ = new BehaviorSubject(initialState)
        this.state$ = this._state$.asObservable()
    }

    get stateSnapshot (): T {
        return this._state$.getValue()
    }

    setState(nextState: T) {
        this._state$.next(nextState)
    }
}