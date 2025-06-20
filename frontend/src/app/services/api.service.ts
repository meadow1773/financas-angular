import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Transacao, Categoria, Tipo } from '../../interfaces/models'

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private apiUrl = 'http://192.168.15.5:3000/api' // ALTERAR EM PRODUÇÃO

    constructor(private http: HttpClient) { }

    // Getters para Transações.
    getTransacoes(): Observable<Transacao[]> {
        return this.http.get<any[]>(`${this.apiUrl}/transacoes`)
    }

    getTransacoesPorId(id: number): Observable<Transacao> {
        return this.http.get<any>(`${this.apiUrl}/transacoes/${id}`)
    }

    // Getters para Categorias.
    getCategorias(): Observable<Categoria[]> {
        return this.http.get<any[]>(`${this.apiUrl}/categorias`)
    }

    getCategoriaPorId(id: number): Observable<Categoria> {
        return this.http.get<any>(`${this.apiUrl}/categorias/${id}`)
    }

    // Getters para Tipos.
    getTipos(): Observable<Tipo[]> {
        return this.http.get<any[]>(`${this.apiUrl}/tipos`)
    }

    getTipoPorId(id: number): Observable<Tipo> {
        return this.http.get<any>(`${this.apiUrl}/tipos/${id}`)
    }
}
