import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-calendario',
  imports: [],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})

export class CalendarioComponent {
  ano: number;
  @Input() aberto = false;
  @Output() toggle = new EventEmitter<void>();
  
  constructor(public global: GlobalService) {
    this.ano = global.anoAtual;
  }
}
