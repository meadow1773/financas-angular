import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
  standalone: false
})
export class ItemComponent {
  itemTipo: string;
  itemNome: string;
  itemNomeClass: string;
  zero: string;

  constructor(global: SharedService) {
    this.itemTipo = 'Receita';
    this.itemNome = 'Salário';
    this.itemNomeClass = global.toClass(this.itemNome);
    this.zero = global.zeroFormat;
  }
}
