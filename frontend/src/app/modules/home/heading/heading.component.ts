import { Component, inject } from '@angular/core'
import { DataHandlerService } from '../../../services/data-handler.service'

@Component({
    standalone: false,
    selector: 'app-heading',
    templateUrl: './heading.component.html',
    styleUrl: './heading.component.scss'
})
export class HeadingComponent {
    mesSelecionado: string
    Data = inject(DataHandlerService)
    calendarioAberto = false

    constructor() {
        this.mesSelecionado = this.Data.getNomeMes()
    }
    toggleCalendario() {
        this.calendarioAberto = !this.calendarioAberto
    }
    async proxMes() {
        let chave = Object.values(this.Data.mesesObj).findIndex(m => m === this.mesSelecionado)
        chave++
        console.log(this.Data.getNomeMes(chave))
    }
    async mesAnt() {
        let chave = Object.values(this.Data.mesesObj).findIndex(m => m === this.mesSelecionado)
        chave--
        console.log(this.Data.getNomeMes(chave))
    }
}

