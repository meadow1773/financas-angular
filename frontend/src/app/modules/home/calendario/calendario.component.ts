import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'

import { MesStore } from '../../../services/store/mes/mes.store'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

@Component({
    standalone: false,
    selector: 'app-calendario',
    templateUrl: './calendario.component.html',
    styleUrl: './calendario.component.scss'
})

export class CalendarioComponent implements OnInit {
    /** Flag se o componente está aberto. */
    @Input() aberto = false

    /** Evento de abrir ou fechar o componente. */
    @Output() alternar = new EventEmitter()

    /** Array com os meses abreviados. */
    mesesAno: string[] = []

    /** Ano atual */
    ano = new Date().getFullYear()

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
        // Preenche os meses em formato curto
        this.mesStore.state$.subscribe(state => {
            this.mesesAno = state.listaMesesCurto
        })
    }

    /**
     * Método que busca o mês a partir da chave do mês abreviado
     * @param mes
     */
    selecionaMes(mesCurto:string) {
        this.mesStore.addMesCurto(mesCurto)
        let mesNum = 0
        this.mesStore.state$.subscribe(state => {
            mesNum = state.mesNum
        })
        this.transacoesStore.carregarTransacoesPorMes(mesNum).subscribe()
    }
}
