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

    /**
     * Método que cria uma tela de carregamento.
     * @param toggle Se a tela é desligada ou apagada. 
     */
    carregando(dom: Document, toggle = true) {
        const tela = dom.createElement('div')
        tela.classList.add('tela')
        const loader = dom.createElement('div')
        loader.classList.add('loader')

        if(toggle) {
            dom.body.prepend(tela)
            tela.append(loader)
            setTimeout(() => { tela.style.opacity = '1' }, 100)
        } else {
            tela.style.opacity = '0'
            setTimeout(() => { tela.remove() }, 200)
        }
    }
}
