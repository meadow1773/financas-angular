import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  /**
   * Objeto de data
   */
  dataObj = new Date()
  /**
   * Ano atual
   */
  anoAtual = this.dataObj.getFullYear()
  /**
   * Mês atual numérico
   */
  mesAtualNum = this.dataObj.getMonth()
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
      this.dataObj.setMonth(mesNum)
    } else {
      this.dataObj.setMonth(this.mesAtualNum)
    }
    const mesMinusculo = new Intl.DateTimeFormat(undefined, { month: 'long' }).format(this.dataObj)
    return mesMinusculo.toUpperCase()[0] + mesMinusculo.slice(1)
  }
}
