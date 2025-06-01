import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-grupo-transacoes',
  imports: [ItemComponent],
  templateUrl: './grupo-transacoes.component.html',
  styleUrl: './grupo-transacoes.component.scss'
})
export class GrupoTransacoesComponent {
  public nomeGrupo:string;

  constructor() {
    this.nomeGrupo = 'Teste';
  }
}
