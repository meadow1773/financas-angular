import { Component } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { CalendarioComponent } from '../calendario/calendario.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-heading',
  imports: [CalendarioComponent, MatIconModule],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss'
})

export class HeadingComponent {
  mesSelecionado: string;
  Data = new DataHandlerService()
  calendarioAberto = false;

  constructor() {
    this.mesSelecionado = this.Data.getNomeMes();
  }

  toggleCalendario() {
    this.calendarioAberto = !this.calendarioAberto;
  }
  async proxMes() {
    console.log()
  }
  async mesAnt() {
    console.log()
  }
}

