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
   * Ano atuaL
   */
  anoAtual = this.dataObj.getFullYear()
  /**
   * Mês atual numérico
   */
  mesAtualNum = this.dataObj.getMonth()
  /**
   * Objeto com nome dos meses abreviados e completos
   */
  mesesObj: {[abrv:string]:string} = {
    'jan': 'Janeiro',
    'fev': 'Fevereiro',
    'mar': 'Março',
    'abr': 'Abril',
    'mai': 'Maio',
    'jun': 'Junho',
    'jul': 'Julho',
    'ago': 'Agosto',
    'set': 'Setembro',
    'out': 'Outubro',
    'nov': 'Novembro',
    'dez': 'Dezembro'
  }

  constructor() { }

  /**
   * Método para retornar o atual ou selecionado em formato de texto
   * @param mesNum Número equivalente ao mês em formato normal (a partir de 1)
   * @returns Mês em formato de texto
   */
  getNomeMes(mesNum?: number): string {
    if (typeof mesNum === 'number') {
      this.dataObj.setMonth(mesNum - 1)
    } else {
      this.dataObj.setMonth(this.mesAtualNum)
    }
    return new Intl.DateTimeFormat(undefined, { month: 'long' }).format(this.dataObj)
  }
}
