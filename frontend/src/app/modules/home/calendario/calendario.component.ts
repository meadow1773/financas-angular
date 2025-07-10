import { Component, EventEmitter, inject, Input, Output } from '@angular/core'

import { DateHandlerService } from '../../../services/date-handler.service'

@Component({
    standalone: false,
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.scss'
})

export class CalendarioComponent {
    /** */
    @Input() aberto = false

    /** */
    @Output() alternar = new EventEmitter<void>()

    /** */
    date = inject(DateHandlerService)

    /** */
    meses: string[]

    /**
     * 
     */
    constructor() {
        this.meses = Object.keys(this.date.mesesObj)
    }
    
    /**
     * Método que busca o mês a partir da chave do mês abreviado
     * @param mesKey Mês abreviado
     */
    async selecionaMes(mesKey:string) {
        console.log(this.date.mesesObj[mesKey])
    }
}
