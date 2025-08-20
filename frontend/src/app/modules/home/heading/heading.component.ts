import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core'

import { ApiService } from '../../../services/api.service'
import { SharedService } from '../../../services/shared.service'

@Component({
    standalone: false,
    selector: 'app-heading',
    templateUrl: './heading.component.html',
    styleUrl: './heading.component.scss'
})
export class HeadingComponent implements OnInit {
    /** Mês selecionado pelo usuário. */
    mesSelecionado!: string

    /** Flag se o componente de Calendário está aberto. */
    calendarioAberto = false

    /** Instância do serviço Shared. */
    private global = inject(SharedService)

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    /** Evento disparado ao mudar de mês. */
    @Output() mesMudou = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() { }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        const data = new Date()
        this.global.setMesAtual(data.getMonth())
        this.mesSelecionado = this.global.formataMesLongo(this.global.getMesAtual())
    }

    /**
     * Marca a flag se o calendário está aberto ou fechado.
     */
    toggleCalendario() {
        this.calendarioAberto = !this.calendarioAberto
    }

    /**
     * Chama as transações do mês anterior.
     */
    mesAnt() {
        const mesNum = this.global.getNumeroMesLongo(this.mesSelecionado)
        const mesAnt = mesNum - 1
        this.global.setMesAtual(mesAnt)
        this.mesSelecionado = this.global.formataMesLongo(mesAnt)

        this.api.getTransacoesPorMes(mesAnt).subscribe(transacoes => {
            console.log(this.mesSelecionado, transacoes)
            this.mesMudou.emit()
        })
    }

    /**
     * Chama as transações do próximo mês.
     */
    proxMes() {
        const mesNum = this.global.getNumeroMesLongo(this.mesSelecionado)
        const proxMes = mesNum + 1
        this.global.setMesAtual(proxMes)
        this.mesSelecionado = this.global.formataMesLongo(proxMes)

        this.api.getTransacoesPorMes(proxMes).subscribe(transacoes => {
            console.log(this.mesSelecionado, transacoes)
            this.mesMudou.emit()
        })
    }
}

