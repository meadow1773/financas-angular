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
}
