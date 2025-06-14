import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-grupo-transacoes',
  templateUrl: './grupo-transacoes.component.html',
  styleUrl: './grupo-transacoes.component.scss',
  standalone: false
})
export class GrupoTransacoesComponent {
  @Input() form!: FormGroup;

  private nomeGrupo!:string;
  private tipo!: "receita" | "despesa";

  /**
   * Método construtor do componente
   */
  constructor(public global:SharedService) {
    this.nomeGrupo = 'Teste'; //TESTE
    this.tipo = "receita"; //TESTE
  }

  /**
   * Getter para o nome do grupo.
   * @param classe Se 'true', retorna o nome em formato de classe HTML.
   * @returns Nome do grupo.
   */
  getNomeGrupo(classe?:boolean) { 
    if (classe) return this.global.toClass(this.nomeGrupo);
    else return this.nomeGrupo;
  }

  /**
   * Getter para o tipo de transações.
   * @returns Tipo de transação.
   */
  getTipo() { return this.tipo; }

  /**
   * Setter para o tipo de transações.
   * @param tipo "receita" | "despesa"
   */
  setTipo(tipo:"receita" | "despesa") { this.tipo = tipo; }

  /**
   * Método OnInit
   */
  ngOnInit() {
    // Criação de campos
    this.form.addControl(`total-${this.getNomeGrupo(true)}`, new FormControl());
  }
}
