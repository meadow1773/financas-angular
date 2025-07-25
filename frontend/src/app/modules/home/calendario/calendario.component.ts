import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

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
    @Output() alternar = new EventEmitter<void>()

    /** Array com os meses abreviados */
    mesesAbrev: string[] = []

    /** Ano atual */
    ano = new Date().getFullYear()

    /**
     * Método construtor do componente.
     */
    constructor() { }
    
    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        // Preenche os meses de acordo com o idioma local
        const formatar = new Intl.DateTimeFormat('default', { month: 'short' })
        for(let i = 0; i < 12; i++) {
            const data = new Date(this.ano, i, 1)
            const mes = formatar.format(data).replace('.', '')
            this.mesesAbrev.push(mes)
        }
    }

    /**
     * Método que busca o mês a partir da chave do mês abreviado
     * @param mesKey Mês abreviado
     */
    selecionaMes(mesKey:string) {
        console.log(this.mesesAbrev.indexOf(mesKey))
    }
}
