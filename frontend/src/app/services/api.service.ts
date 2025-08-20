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
    private http = inject(HttpClient)

    /**
     * Método contrutor do serviço.
     */
    constructor() {}

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
    getTransacoesPorMes(mes: number, nomeCategoria?: string): Observable<Transacao[]> {
        const options = nomeCategoria ? {params: {categoria: nomeCategoria}} : {}
        return this.http.get<Transacao[]>(`${this.apiUrl}/transacoes/mes/${mes}`, options)
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
    /**
     * Retorna todas as Categorias.
     * @returns 
     */
    getCategorias(): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`)
    }
    
    /**
     * Retorna a Categoria de um determinado Id.
     * @param id 
     * @returns 
     */
    getCategoriaPorId(id: number): Observable<Categoria> {
        return this.http.get<Categoria>(`${this.apiUrl}/categorias/${id}`)
    }

    /**
     * Retorna a Categoria pelo Id de um Tipo.
     * @param idTipo 
     * @returns 
     */
    getCategoriasPorIdTipo(idTipo: number): Observable<Categoria[]> {
        return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/tipo/${idTipo}`)
    }

    // Getters para Tipos.
    /**
     * Retorna todos os Tipos.
     * @returns 
     */
    getTipos(): Observable<Tipo[]> {
        return this.http.get<Tipo[]>(`${this.apiUrl}/tipos`)
    }

    /**
     * Retorna o Tipo de um determinado Id.
     * @param id 
     * @returns 
     */
    getTipoPorId(id: number): Observable<Tipo> {
        return this.http.get<Tipo>(`${this.apiUrl}/tipos/${id}`)
    }
}
