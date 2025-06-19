import { Component, Input } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
  standalone: false
})

export class CategoriaComponent {
  @Input() form!: FormGroup;
  @Input() itemNome!: string;

  zero: string;

  /**
   * Método construtor do componente.
   * @param nome Nome do item.
   */
  constructor(public global:SharedService) {
    this.zero = global.zeroFormat;
  }
  
  /**
   * Getter para o nome do item.
   * @param classe Se 'true', retorna o nome em formato de classe HTML.
   * @returns Nome do item.
   */
  getItemNome(classe?:boolean) {
    if (classe) return this.global.toClass(this.itemNome);
    return this.itemNome;
  }

  /**
   * Método OnInit.
   */
  ngOnInit() {
    // Criação de campos.
    this.form.addControl(
      this.getItemNome(true), new FormControl('', Validators.pattern(''))
    );
    this.form.addControl(
      `${this.getItemNome(true)}-soma`, new FormControl()
    );
  }
}
