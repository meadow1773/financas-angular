import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  public itemTipo: string;
  public itemNome: string;
  public itemNomeClass: string;

  constructor(public global: GlobalService) {
    this.itemTipo = 'Receita';
    this.itemNome = 'Salário';
    this.itemNomeClass = global.toClass(this.itemNome);
  }
}
