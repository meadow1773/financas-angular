import { DOCUMENT } from '@angular/common'
import { AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { DataRequest } from '../../../../interfaces/dataRequest'
import { Icone } from '../../../../interfaces/models'
import { ApiService } from '../../../services/api.service'
import { CalculadoraService } from '../../../services/calculadora.service'
import { DateHandlerService } from '../../../services/date-handler.service'
import { SharedService } from '../../../services/shared.service'
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
    @Input() iconeCategoria!: Icone | null

    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Instância do serviço de calculadora. */
    calculadora = inject(CalculadoraService)

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    /** Instância do serviço DataHandler */
    private dateHandler = inject(DateHandlerService)

    /** Ícone padrão para quando o Icone recebido da Api for nulo. */
    iconePadrao: string

    /** Objeto que receberá os valores que serão enviados para o backend. */
    dataRequest: DataRequest

    /**  Nome da categoria em formato de classe HTML. */
    categoriaNomeClasse!: string

    /** Evento ao clicar os botões add ou rmv. */
    @Output() alterou = new EventEmitter()

    /** Evento ao clicar no botão update. */
    @Output() updateEvento = new EventEmitter()

    /** Evento ao receber as Transações. */
    @Output() transacoesOk = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() {
        this.iconePadrao = this.global.iconePadrao
        
        this.dataRequest = {
            categoria: '',
            mes: this.dateHandler.mesAtualNum,
            ano: this.dateHandler.anoAtual,
            valores: [],
            descricao: [],
            dataCadastro: this.dateHandler.dateObj
        }
    }
    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        // Corrige o nome da categoria.
        this.dataRequest.categoria = this.categoriaNome
        this.categoriaNomeClasse = this.global.toClass(this.categoriaNome)

        // Criação de campos.
        this.form.addControl(
            this.categoriaNomeClasse,
            new FormControl('', Validators.compose([Validators.pattern(/^-?\d+(\.\d{3})*(,\d{2})?$/)]))
        )
        this.form.addControl(
            `${this.categoriaNomeClasse}-soma`, new FormControl(this.calculadora.formataToMoeda(0))
        )

        // Carrega as Transações.
        this.api.getTransacoesPorMes(this.dataRequest.mes, this.categoriaNome)
            .subscribe(transacoes => {
                let valorSoma = 0
                transacoes.forEach(transacao =>{
                    valorSoma += parseFloat(String(transacao.valor))
                    this.form.get(`${this.categoriaNomeClasse}-soma`)?.setValue(this.calculadora.formataToMoeda(valorSoma))

                    this.transacoesOk.emit()
                })
            })
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
    private testService = inject(TestService) 
    private domInstance = inject(DOCUMENT)
    ngAfterViewInit() {
        //Testes
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
    botaoInfo(evento: Event) {
        console.log(evento.target)
    }
}
