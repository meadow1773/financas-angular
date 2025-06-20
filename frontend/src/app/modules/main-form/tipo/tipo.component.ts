import { Component, Input } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { SharedService } from '../../../services/shared.service'
import { ApiService } from '../../../services/api.service'
import { Categoria, Icone } from '../../../../interfaces/models'

@Component({
    selector: 'app-tipo',
    templateUrl: './tipo.component.html',
    styleUrl: './tipo.component.scss',
    standalone: false
})
export class TipoComponent {
  @Input() form!: FormGroup
  @Input() nomeTipo!:string
  @Input() iconeTipo!: Icone | null
  iconePadrao: string
  categorias!: Categoria[]

  /**
   * Método construtor do componente
   */
  constructor(public global:SharedService, private api:ApiService) {
      this.iconePadrao = global.iconePadrao
  }

  /**
   * Getter para o nome do grupo.
   * @param classe Se 'true', retorna o nome em formato de classe HTML.
   * @returns Nome do grupo.
   */
  getNomeTipo(classe?:boolean) {
      if (classe) return this.global.toClass(this.nomeTipo)
      else return this.nomeTipo
  }

  /**
   * Método OnInit
   */
  ngOnInit() {
      // Carrega as categorias
      const categorias = this.api.getCategorias()
      categorias.subscribe(array => {
          this.categorias = array.filter(item => item.tipo.nome === this.nomeTipo)
      })

      // Criação de campos
      this.form.addControl(`total-${this.getNomeTipo(true)}`, new FormControl())
  }
}
