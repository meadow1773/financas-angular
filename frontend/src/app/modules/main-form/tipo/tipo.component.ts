import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { ApiService } from '../../../services/api.service';
import { Categoria } from '../../../../interfaces/models';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss',
  standalone: false
})
export class TipoComponent {
  @Input() form!: FormGroup;
  @Input() nomeGrupo!:string;
  items!: Categoria[];
  
  /**
   * Método construtor do componente
   */
  constructor(public global:SharedService, private api:ApiService) { }

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
   * Método OnInit
   */
  ngOnInit() {
    // Carrega as categorias
    const categorias = this.api.getCategorias();
    categorias.subscribe(array => this.items = array.filter(item => item.tipo.nome === this.nomeGrupo));
    
    // Criação de campos
    this.form.addControl(`total-${this.getNomeGrupo(true)}`, new FormControl());
  }
}
