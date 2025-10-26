import { DOCUMENT } from '@angular/common'
import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { lastValueFrom } from 'rxjs'

import { DataRequest } from '../../../../interfaces/dataRequest'
import { Icone } from '../../../../interfaces/models'
import { CalculadoraService } from '../../../services/calculadora.service'
import { SharedService } from '../../../services/shared.service'
import { MesStore } from '../../../services/store/mes/mes.store'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'
import { TestService } from '../../../tests/test.service'

@Component({
    standalone: false,
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrl: './categoria.component.scss'
})

export class CategoriaComponent implements OnInit, AfterViewInit {
    /** FormGroup recebido do componente Tipo. */
    @Input() form!: FormGroup

    /** Nome da categoria recebido do componente Tipo. */
    @Input() categoriaNome!: string

    /** Ícone da categoria recebido do componente Tipo. */
    @Input() iconeCategoria!: Icone

    /** Tipo de nome da categoria recebido do componente Tipo. */
    @Input() tipoNome!: string

    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Instância do serviço de calculadora. */
    calculadora = inject(CalculadoraService)

    /** Instância do MesStore para obter o mês atual. */
    private mesStore = inject(MesStore)

    /** Instância do TransacoesStore para carregar as transações da categoria. */
    private transacoesStore = inject(TransacoesStore)

    /** Ícone padrão para quando o Icone recebido da Api for nulo. */
    iconePadrao!: string

    /** Objeto que receberá os valores que serão enviados para o backend. */
    dataRequest!: DataRequest

    /**  Nome da categoria em formato de classe HTML. */
    categoriaNomeClasse!: string

    infoOn = false

    /** Evento ao clicar os botões add ou rmv. */
    @Output() alterou = new EventEmitter()

    /** Evento ao clicar no botão update. */
    @Output() updateEvento = new EventEmitter()

    /** Evento ao carregar novas transações. */
    @Output() transacoesOk = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() { }
    
    /**
     * Método OnInit do componente.
     */
    async ngOnInit() {
        // Carrega o ícone padrão.
        this.iconePadrao = this.global.iconePadrao

        // Cria DataRequest.
        this.preparaDataRequest()

        // Corrige o nome da categoria.
        this.dataRequest.categoria = this.categoriaNome
        this.categoriaNomeClasse = this.global.toClass(this.categoriaNome)

        // Criação de campos.
        this.form.addControl(
            this.categoriaNomeClasse,
            new FormControl('', Validators.pattern(/^\d+,\d{1,2}$/))
        )
        this.form.addControl(
            `${this.categoriaNomeClasse}-soma`, new FormControl(this.calculadora.formataToMoeda(0))
        )

        this.carregaTransacoes()
    }

    /**
     * Carrega as transações da categoria e atualiza a soma.
     */
    private async carregaTransacoes() {
        await lastValueFrom(this.transacoesStore.carregarTransacoes(this.dataRequest.mes, this.categoriaNome))
        this.transacoesStore.state$
            .subscribe(state => {
                if (!state) return
                const listaTransacoes = state.getTransacoes()
                let valorSoma = 0
                for (const transacao of listaTransacoes[this.categoriaNome]) {
                    valorSoma += parseFloat(String(transacao.valor))
                }
                const formControl = this.form.get(`${this.categoriaNomeClasse}-soma`)
                const valorFormatado = this.calculadora.formataToMoeda(valorSoma)
                formControl?.setValue(valorFormatado)
                this.transacoesOk.emit()
            })
    }
    /**
     * Prepara o objeto DataRequest para envio ao backend.
     */
    private preparaDataRequest() {
        const data = this.mesStore.stateSnapshot.data
        this.dataRequest = {
            categoria: '',
            mes: this.mesStore.stateSnapshot.mesNum,
            ano: data.getFullYear(),
            valores: [],
            descricao: [],
            dataCadastro: data
        }
    }

    /**
     * Atalhos de teclado para realizar a soma.
     * @param tecla 
     */
    atalhoSoma(tecla: KeyboardEvent) {
        if(tecla.key === '+' || tecla.key === 'Enter') {
            tecla.preventDefault()
            this.botaoAdd(this.categoriaNomeClasse)
        } 
    }
    
    /**
     * Atalhos de teclado para realizar a subtração.
     * @param tecla 
    */
    atalhoSubtrai(tecla: KeyboardEvent) {
        if(tecla.key === '-' || tecla.key === 'Delete') {
            tecla.preventDefault()
            this.botaoRmv(this.categoriaNomeClasse)
        } 
    }

    /**
     * Método AfterViewInit do componente.
     */
    //Testes
    testService = inject(TestService) 
    private domInstance = inject(DOCUMENT)
    ngAfterViewInit() {
        this.testService.testeTodos(this.domInstance, this.form, this.categoriaNomeClasse)
    }

    /**
     * Função disparada pelo botão add.
     * @param evento 
     */
    botaoAdd(nomeControl: string) {
        this.calculadora.somar(nomeControl, this.form, this.dataRequest)
        this.alterou.emit(this.dataRequest)
    }

    /**
     * Função disparada com o evento de clique no botão rmv.
     * @param evento 
     */
    botaoRmv(nomeControl: string) {
        this.calculadora.subtrai(nomeControl, this.form, this.dataRequest)
        this.alterou.emit(this.dataRequest)
    }

    /**
     * Função disparada com o evento de clique no botão info.
     * @param evento 
     */    
    botaoInfo() {
        this.infoOn = !this.infoOn
    }
}
