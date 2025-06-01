import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CalendarioComponent } from '../calendario/calendario.component';

@Component({
  selector: 'app-heading',
  imports: [CalendarioComponent],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss'
})

export class HeadingComponent {
  mes: string;
  calendarioAberto = false;

  constructor(public global: GlobalService) {
    this.mes = this.global.mesAtualStr;
  }

  toggleCalendario() {
    this.calendarioAberto = !this.calendarioAberto;
  }
}

