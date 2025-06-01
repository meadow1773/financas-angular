import { Injectable } from '@angular/core';

/**
 * Serviço que guarda propriedades e métodos globais.
 */

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
  dataObj: Date = new Date();
  anoAtual: number = this.dataObj.getFullYear();
  mesAtualNum: number = this.dataObj.getMonth();

  mesAtualStr: string = this.dataObj.toLocaleString(undefined, { month: 'long' });

  constructor() { }

  /**
   * Método para transformar textos formatados em classes para uso no HTML
   * @param texto Texto com formatação padrão
   * @returns Texto em formato de classe
   */
  public toClass (texto:string) {
    return texto.toLowerCase().replace(/\s/g,'-').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }
}
