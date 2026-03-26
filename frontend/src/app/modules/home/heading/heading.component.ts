import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { Subject, takeUntil, tap } from 'rxjs'

import { MesStore } from '../../../services/store/mes/mes.store'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

@Component({
    standalone: false,
    selector: 'app-heading',
    templateUrl: './heading.component.html',
    styleUrl: './heading.component.scss'
})
export class HeadingComponent implements OnInit, OnDestroy {
    /** Mês selecionado pelo usuário. */
    mesSelecionado!: string

    /** Flag se o componente de Calendário está aberto. */
    calendarioAberto = false

    /** Instância da store de mês. */
    private mesStore = inject(MesStore)

    /** Instância da store de transações. */
    private transacoesStore = inject(TransacoesStore)

    /**  */
    private destroy$ = new Subject<void>()

    /**
     * Método construtor do componente.
     */
    constructor() { }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        this.mesStore.state$.pipe(
            takeUntil(this.destroy$),
            tap(mesState => {
                this.mesSelecionado = mesState.mesLongo
            })
        ).subscribe()
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

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }
}

