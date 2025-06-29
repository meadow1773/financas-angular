import { DOCUMENT } from '@angular/common'
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { firstValueFrom } from 'rxjs'

import { DataRequest } from '../../../../interfaces/dataRequest'
import { Icone, Transacao } from '../../../../interfaces/models'
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
    private calculadora = inject(CalculadoraService)

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    /** Instância do serviço DataHandler */
    private dateHandler = inject(DateHandlerService)

    /** Transações a serem recebidas da Api. */
    transacoes!: Transacao[]

    /** Ícone padrão para quando o Icone recebido da Api for nulo. */
    iconePadrao: string

    /** Objeto que receberá os valores que serão enviados para o backend. */
    dataRequest: DataRequest

    /**  Nome da categoria em formato de classe HTML. */
    categoriaNomeClasse!: string

    /** Evento ao clicar no botão Add. */
    @Output() addEvent = new EventEmitter()

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
            descricao: '',
            dataCadastro: this.dateHandler.dateObj
        }
    }
    /**
     * Método OnInit do componente.
     */
    async ngOnInit(): Promise<void> {
        // this.global.carregando()

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
        this.transacoes = await firstValueFrom(this.api.getTransacoesPorMes(this.dataRequest.mes, this.categoriaNome))
        let valorSoma = 0

        this.transacoes.forEach(transacao => {
            valorSoma += parseFloat(String(transacao.valor))
            this.form.get(`${this.categoriaNomeClasse}-soma`)?.setValue(this.calculadora.formataToMoeda(valorSoma))
        })

    }

    /**
     * Método AfterViewInit do componente.
     */
    private testService = inject(TestService) 
    private domInstance = inject(DOCUMENT)
    @ViewChild('valorEl') input!: ElementRef<HTMLInputElement>
    ngAfterViewInit() {
        this.input.nativeElement.placeholder = this.calculadora.formataToMoeda(0)

        //Testes
        this.testService.testeInput(this.input.nativeElement)
        this.testService.testeTodos(this.domInstance, this.form.get(this.categoriaNomeClasse)!)
    }

    /**
     * Função disparada pelo botão add.
     * @param evento 
     */
    botaoAdd(evento: Event) {
        this.calculadora.somar(evento.target as HTMLElement, this.form, this.dataRequest)
        this.addEvent.emit(this.dataRequest)
    }

    /**
     * Função disparada com o evento de clique no botão rmv.
     * @param evento 
     */
    botaoRmv(evento: Event) {
        this.calculadora.subtrai(evento.target as HTMLElement, this.form, this.dataRequest)
    }

    /**
     * Função disparada com o evento de clique no botão info.
     * @param evento 
     */    
    botaoInfo(evento: Event) {
        console.log(evento.target)
    }
}
