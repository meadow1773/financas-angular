import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario',
  imports: [MatIconModule, CommonModule],
  providers: [DataHandlerService],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})

export class CalendarioComponent {
  @Input() aberto = false
  @Output() toggle = new EventEmitter<void>()
  
  Data = new DataHandlerService()
  meses: string[]

  constructor() {
    this.meses = Object.keys(this.Data.mesesObj)
  }
  /**
   * Método que busca o mês a partir da chave do mês abreviado
   * @param mesKey Mês abreviado
   */
  async selecionaMes(mesKey:string) {
    console.log(this.Data.mesesObj[mesKey])
  }
}
