import { Component } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item',
  imports: [MatIconModule],
  providers: [SharedService],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  public itemTipo: string;
  public itemNome: string;
  public itemNomeClass: string;
  public zero: string;

  constructor(public global: SharedService) {
    this.itemTipo = 'Receita';
    this.itemNome = 'Salário';
    this.itemNomeClass = global.toClass(this.itemNome);
    this.zero = global.zeroFormat;
  }
}
