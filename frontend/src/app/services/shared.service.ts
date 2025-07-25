import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    /**
     * Material Icon padrão
     */
    iconePadrao = 'attach_money'

    /**
     * Objeto com a data atual.
     */
    private data = new Date()

    /**
     * Método construtor do serviço.
     */
    constructor() { }

    /**
     * Método para transformar textos formatados em classes para uso no HTML
     * @param texto Texto com formatação padrão
     * @returns Texto em formato de classe
     */
    toClass (texto:string) {
        return texto.toLowerCase().replace(/\s/g,'-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }

    /**
     * Retorna o mês formatado em valor de texto longo
     * @param mes 
     * @returns 
     */
    formataMesLongo(mes: number): string {
        const formatar = new Intl.DateTimeFormat('default', { month: 'long' })
        this.data.setMonth(mes)
        return formatar.format(this.data)
    }

    /**
     * Retorna o mês formatado em valor de texto curto
     * @param mes 
     * @returns 
     */
    formataMesCurto(mes: number): string {
        const formatar = new Intl.DateTimeFormat('default', { month: 'short' })
        this.data.setMonth(mes)
        return formatar.format(this.data)
    }
}
