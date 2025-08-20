import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'

import { ApiService } from '../../../services/api.service'
import { SharedService } from '../../../services/shared.service'

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

    /** Instância do serviço global. */
    private global = inject(SharedService)

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    /** */
    @Output() mesMudou = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() { }
    
    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        // Preenche os meses de acordo com o idioma local
        this.mesesAno = this.global.geraMesesCurto()
    }

    /**
     * Método que busca o mês a partir da chave do mês abreviado
     * @param mes
     */
    selecionaMes(mes:string) {
        const mesNum = this.global.getNumeroMesCurto(mes)
        this.global.setMesAtual(mesNum)
        this.mesMudou.emit()

        this.api.getTransacoesPorMes(mesNum).subscribe(transacoes => {
            console.log(mes, transacoes)
        })
    }
}
