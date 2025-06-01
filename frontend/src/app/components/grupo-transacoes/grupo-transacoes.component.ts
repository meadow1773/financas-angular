import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-grupo-transacoes',
  imports: [ItemComponent],
  templateUrl: './grupo-transacoes.component.html',
  styleUrl: './grupo-transacoes.component.scss'
})
export class GrupoTransacoesComponent {
  public nomeGrupo:string;
  public nomeGrupoClass: string;

  constructor(public global: GlobalService) {
    this.nomeGrupo = 'Teste';
    this.nomeGrupoClass = global.toClass(this.nomeGrupo);
  }
}
