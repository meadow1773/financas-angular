import { Component, inject, Input, OnInit } from '@angular/core'

import { Transacao } from '../../../../interfaces/models'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

@Component({
    standalone: false,
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss'
})
export class InfoComponent implements OnInit{
    /** Nome da categoria recebido do componente Tipo. */
    @Input() categoriaNome!: string

    /** Instância do TransacoesStore para carregar as transações da categoria. */
    private transacoesStore = inject(TransacoesStore)

    transacoesCarregadas!: Transacao[]

    ngOnInit() {
        const transacoes = this.transacoesStore.stateSnapshot.getTransacoes()
        this.transacoesCarregadas = transacoes[this.categoriaNome]
        console.log(this.transacoesCarregadas)
    }
}
