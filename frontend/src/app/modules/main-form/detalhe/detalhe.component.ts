import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'

import { Transacao } from '../../../../interfaces/models'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

@Component({
    standalone: false,
    selector: 'app-detalhe',
    templateUrl: './detalhe.component.html',
    styleUrl: './detalhe.component.scss'
})
export class DetalheComponent implements OnInit, OnDestroy{
    /** Nome da categoria recebido do componente Tipo. */
    @Input() categoriaNome!: string

    /** Instância do TransacoesStore para carregar as transações da categoria. */
    private transacoesStore = inject(TransacoesStore)

    /** Transações carregadas para a categoria específica. */
    transacoesCarregadas!: Transacao[]

    /** Colunas que serão exibidas na tabela de transações. */
    displayedColumns: { nome: string, label: string }[] = [
        { nome: 'id', label: 'ID' },
        { nome: 'dataCriacao', label: 'Data' },
        { nome: 'descricao', label: 'Descrição' },
        { nome: 'valor', label: 'Valor' },
        { nome: 'acoes', label: 'Ações' },
    ]

    /** Subscription para monitorar mudanças nas transações. */
    private transacoesSubscription!: Subscription
    
    /**
     * Metodo OnInit do componente.
     */
    ngOnInit() {
        this.transacoesSubscription = this.transacoesStore.state$.subscribe(state => {
            const transacoes = state.getTransacoes()
            this.transacoesCarregadas = transacoes[this.categoriaNome]
        })
    }

    /**
     * Retorna as colunas que serão exibidas na tabela.
     * @returns 
     */
    getDisplayedColumns(): string[] {
        return this.displayedColumns.map(coluna => coluna.nome)
    }

    /**
     * Formata o valor da célula com base na coluna.
     * @param transacao 
     * @param coluna 
     * @returns 
     */
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

    /**
     * Deleta uma transação com base no ID fornecido.
     * @param idTransacao 
     */
    deletaTransacao(idTransacao: number) {
        this.transacoesStore.excluiTransacao(idTransacao).subscribe()
    }
    
    /**
     * Metodo OnDestroy do componente.
     */
    ngOnDestroy() {
        this.transacoesSubscription.unsubscribe()
    }
}
