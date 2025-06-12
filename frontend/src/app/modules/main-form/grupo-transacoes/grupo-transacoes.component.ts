import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-grupo-transacoes',
  templateUrl: './grupo-transacoes.component.html',
  styleUrl: './grupo-transacoes.component.scss',
  standalone: false
})
export class GrupoTransacoesComponent {
  nomeGrupo:string;
  nomeGrupoClass: string;
  tipo!: "receita" | "despesa";

  constructor(global:SharedService) {
    this.nomeGrupo = 'Teste';
    this.nomeGrupoClass = global.toClass(this.nomeGrupo);
    this.tipo = "receita"; //TESTE
  }

  getTipo() { return this.tipo; }

  setTipo(tipo:"receita" | "despesa") { this.tipo = tipo; }

}
