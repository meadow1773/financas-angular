import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class DateHandlerService {
    /**
   * Objeto de data
   */
    dateObj = new Date()
    /**
   * Ano atual
   */
    anoAtual = this.dateObj.getFullYear()
    /**
   * Mês atual numérico
   */
    mesAtualNum = this.dateObj.getMonth()
    /**
   * Objeto com os nome dos meses abreviados e completos
   */
    mesesObj: { [abrev:string] : string } = {
        jan : 'Janeiro',
        fev : 'Fevereiro',
        mar : 'Março',
        abr : 'Abril',
        mai : 'Maio',
        jun : 'Junho',
        jul : 'Julho',
        ago : 'Agosto',
        set : 'Setembro',
        out : 'Outubro',
        nov : 'Novembro',
        dez : 'Dezembro'
    }

    constructor() { }

    /**
   * Método para retornar o atual ou selecionado em formato de texto.
   * @returns Mês em formato de texto capitalizado.
   */
    getNomeMes(mesNum?: number): string {
        if (typeof mesNum === 'number') {
            this.dateObj.setMonth(mesNum)
        } else {
            this.dateObj.setMonth(this.mesAtualNum)
        }
        const mesMinusculo = new Intl.DateTimeFormat(undefined, { month: 'long' }).format(this.dateObj)
        return mesMinusculo.toUpperCase()[0] + mesMinusculo.slice(1)
    }
}
