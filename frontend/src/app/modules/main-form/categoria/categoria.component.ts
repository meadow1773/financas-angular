import { Component, Input } from '@angular/core'
import { SharedService } from '../../../services/shared.service'
import { FormControl, FormGroup } from '@angular/forms'
import { Icone } from '../../../../interfaces/models'
import { CalculadoraService } from '../../../services/calculadora.service'

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrl: './categoria.component.scss',
    standalone: false
})

export class CategoriaComponent {
  @Input() form!: FormGroup
  @Input() categoriaNome!: string
  @Input() iconeCategoria!: Icone | null

  zero: string
  iconePadrao: string

  /**
   * Método construtor do componente.
   * @param nome Nome do item.
   */
  constructor(public global:SharedService, public calculadora: CalculadoraService) {
      this.zero = global.zeroFormat
      this.iconePadrao = global.iconePadrao
  }

  /**
   * Getter para o nome do item.
   * @param classe Se 'true', retorna o nome em formato de classe HTML.
   * @returns Nome do item.
   */
  getCategoriaNome(classe?:boolean) {
      if (classe) return this.global.toClass(this.categoriaNome)
      return this.categoriaNome
  }

  /**
   * Método OnInit.
   */
  ngOnInit() {
      // Criação de campos.
      this.form.addControl(
          this.getCategoriaNome(true), new FormControl('', this.calculadora.validadorReal()))
      this.form.addControl(
          `${this.getCategoriaNome(true)}-soma`, new FormControl()
      )
  }
}
