import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { DataRequest } from '../../interfaces/dataRequest'
import { Transacao, Categoria, Tipo } from '../../interfaces/models'

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    /** URL da Api. */
    private apiUrl = 'http://localhost:3000/api' // ALTERAR EM PRODUÇÃO

    /** Instância da classe de cliente HTTP. */
    private http: HttpClient

    /**
     * Método contrutor do serviço.
     */
    constructor() {
        this.http = inject(HttpClient)
    }

    // Getters para Transações.
    /**
     * Retorna todas as Transações.
     * @returns 
     */
    getTransacoes(): Observable<Transacao[]> {
        return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes`)
    }

    /**
     * Retorna a Transação de um determinado Id.
     * @param id 
     * @returns 
     */
    getTransacaoPorId(id: number): Observable<Transacao> {
        return this.http.get<Transacao>(`${this.apiUrl}/transacoes/${id}`)
    }

    /**
     * Retorna as Transações de um determinado mês.
     * @param mes 
     * @returns 
     */
    getTransacoesPorMes(mes: number, nomeCategoria = ''): Observable<Transacao[]> {
        return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes/mes/${mes}`, {params: {categoria: nomeCategoria}})
    }

    /**
     * Envia um objeto DataRequest para registro de Transações.
     * @param dataRequest 
     * @returns 
     */
    setTransacoes(dataRequest: DataRequest[]) {
        return this.http.put(`${this.apiUrl}/transacoes`, dataRequest)
    }

    // Getters para Categorias.
    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`)
    }

    getCategoriaPorId(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`)
    }

    getCategoriasPorIdTipo(idTipo: number): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/tipo/${idTipo}`)
    }

    // Getters para Tipos.
    getTipos(): Observable<Tipo[]> {
        return this.http.get<Tipo[]>(`${this.apiUrl}/tipos`)
    }

    getTipoPorId(id: number): Observable<Tipo> {
        return this.http.get<Tipo>(`${this.apiUrl}/tipos/${id}`)
    }
}
