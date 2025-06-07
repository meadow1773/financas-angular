import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  /**
   * Zero em formato de moeda real
  */
  zeroFormat = 'R$ 0,00'

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
