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
}
