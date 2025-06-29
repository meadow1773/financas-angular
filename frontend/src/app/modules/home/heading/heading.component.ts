import { Component, inject } from '@angular/core'

import { DateHandlerService } from '../../../services/date-handler.service'

@Component({
    standalone: false,
    selector: 'app-heading',
    templateUrl: './heading.component.html',
    styleUrl: './heading.component.scss'
})
export class HeadingComponent {
    mesSelecionado: string
    date = inject(DateHandlerService)
    calendarioAberto = false

    constructor() {
        this.mesSelecionado = this.date.getNomeMes()
    }
    toggleCalendario() {
        this.calendarioAberto = !this.calendarioAberto
    }
    async proxMes() {
        let chave = Object.values(this.date.mesesObj).findIndex(m => m === this.mesSelecionado)
        chave++
        console.log(this.date.getNomeMes(chave))
    }
    async mesAnt() {
        let chave = Object.values(this.date.mesesObj).findIndex(m => m === this.mesSelecionado)
        chave--
        console.log(this.date.getNomeMes(chave))
    }
}

