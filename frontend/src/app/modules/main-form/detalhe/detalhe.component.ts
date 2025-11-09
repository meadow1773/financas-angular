import { Component, inject, Input, OnInit } from '@angular/core'

import { Transacao } from '../../../../interfaces/models'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

@Component({
    standalone: false,
    selector: 'app-detalhe',
    templateUrl: './detalhe.component.html',
    styleUrl: './detalhe.component.scss'
})
export class DetalheComponent implements OnInit{
    /** Nome da categoria recebido do componente Tipo. */
    @Input() categoriaNome!: string

    /** Instância do TransacoesStore para carregar as transações da categoria. */
    private transacoesStore = inject(TransacoesStore)

    transacoesCarregadas!: Transacao[]

    displayedColumns: { nome: string, label: string }[] = [
        { nome: 'id', label: 'ID' },
        { nome: 'dataCriacao', label: 'Data' },
        { nome: 'descricao', label: 'Descrição' },
        { nome: 'valor', label: 'Valor' },
        { nome: 'acoes', label: 'Ações' },
    ]
    
    ngOnInit() {
        const transacoes = this.transacoesStore.stateSnapshot.getTransacoes()
        this.transacoesCarregadas = transacoes[this.categoriaNome]
    }

    getDisplayedColumns(): string[] {
        return this.displayedColumns.map(coluna => coluna.nome)
    }

    formataCelula(transacao: Transacao, coluna: keyof Transacao | string) {
        switch (coluna) {
        case 'valor':
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transacao[coluna as keyof Transacao] as number)
        case 'dataCriacao':
            return new Date(transacao[coluna as keyof Transacao] as string | number).toLocaleDateString('pt-BR')
        default:
            if (coluna in transacao) {
                return (transacao as any)[coluna]
            }
            return ''
        }
    }

    deletaTransacao(idTransacao: number) {
        this.transacoesStore.excluiTransacao(idTransacao).subscribe()
    }
}
