import { Component, inject, OnInit } from '@angular/core'

import { MesStore } from '../../../services/store/mes/mes.store'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

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

    private mesStore = inject(MesStore)

    private transacoesStore = inject(TransacoesStore)

    /**
     * Método construtor do componente.
     */
    constructor() { }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        this.mesStore.state$.subscribe(mesState => {
            this.mesSelecionado = mesState.mesLongo
        })
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
        const mesAtual = this.mesStore.stateSnapshot.mesNum
        this.mesStore.addMesNum(mesAtual - 1)
        const mesAnt = this.mesStore.stateSnapshot.mesNum
        this.transacoesStore.carregarTransacoesPorMes(mesAnt).subscribe()
    }
    
    /**
     * Chama as transações do próximo mês.
    */
    proxMes() {
        const mesAtual = this.mesStore.stateSnapshot.mesNum
        this.mesStore.addMesNum(mesAtual + 1)
        const proxMes = this.mesStore.stateSnapshot.mesNum
        this.transacoesStore.carregarTransacoesPorMes(proxMes).subscribe()
    }
}

