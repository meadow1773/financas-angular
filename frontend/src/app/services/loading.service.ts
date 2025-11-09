import { Injectable } from '@angular/core'
import { map, merge, Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    /**
     * Array de observables de loading
     */
    private loadings: Observable<boolean>[] = []

    /**
     * Adiciona um observable de loading ao serviço
     * @param loading 
     */
    addLoading(loading: Observable<boolean>) {
        this.loadings.push(loading)
    }

    /**
     * Retorna um observable que indica se algum loading está ativo
     * @returns 
     */
    getLoading(): Observable<boolean> {
        return merge(...this.loadings).pipe(
            map(loading => loading === true)
        )
    }
}
