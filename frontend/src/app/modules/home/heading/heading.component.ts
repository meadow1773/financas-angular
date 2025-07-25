import { Component, inject, OnInit } from '@angular/core'

import { SharedService } from '../../../services/shared.service'

@Component({
    standalone: false,
    selector: 'app-heading',
    templateUrl: './heading.component.html',
    styleUrl: './heading.component.scss'
})
export class HeadingComponent implements OnInit {
    /** Mês selecionado pelo usuário. */
    mesSelecionado?: string

    /** Flag se o componente de Calendário está aberto. */
    calendarioAberto = false

    /** Instância do serviço Shared. */
    global = inject(SharedService)

    /**
     * Método construtor do componente.
     */
    constructor() { }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        const data = new Date()
        this.mesSelecionado = this.global.formataMesLongo(data.getMonth())
    }

    /**
     * Marca a flag se o calendário está aberto ou fechado.
     */
    toggleCalendario() {
        this.calendarioAberto = !this.calendarioAberto
    }

    mesAnt() {}

    proxMes() {}
}

