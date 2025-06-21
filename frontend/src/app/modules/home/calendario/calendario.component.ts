import { Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { DataHandlerService } from '../../../services/data-handler.service'

@Component({
    standalone: false,
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.scss'
})

export class CalendarioComponent {
    @Input() aberto = false
    @Output() alternar = new EventEmitter<void>()
    Data = inject(DataHandlerService)

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
