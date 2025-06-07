import { Component } from '@angular/core';
import { ItemComponent } from '../item/item.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-grupo-transacoes',
  imports: [ItemComponent, MatIconModule],
  providers: [SharedService],
  templateUrl: './grupo-transacoes.component.html',
  styleUrl: './grupo-transacoes.component.scss'
})
export class GrupoTransacoesComponent {
  public nomeGrupo:string;
  public nomeGrupoClass: string;

  constructor(global:SharedService) {
    this.nomeGrupo = 'Teste';
    this.nomeGrupoClass = global.toClass(this.nomeGrupo);
  }
}
