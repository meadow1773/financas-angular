import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { Categoria, Icone } from '../../../../interfaces/models'
import { ApiService } from '../../../services/api.service'
import { CalculadoraService } from '../../../services/calculadora.service'
import { SharedService } from '../../../services/shared.service'

@Component({
    standalone: false,
    selector: 'app-tipo',
    templateUrl: './tipo.component.html',
    styleUrl: './tipo.component.scss'
})
export class TipoComponent implements OnInit{
    /** FormGrup recebido do componente MainForm. */
    @Input() form!: FormGroup

    /** Nome do Tipo recebido do componente MainForm. */
    @Input() nomeTipo!:string

    /** Icone do Tipo recebido do componente MainForm. */
    @Input() iconeTipo!: Icone | null

    /** Id do Tipo recebido do componente MainForm. */
    @Input() idTipo!: number

    /**
     * Evento ao clicar os botões add ou rmv
     * Recebido do componente Categoria.
     */
    @Output() alterou = new EventEmitter()

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Ícone padrão para quando o Icone recebido da Api for nulo. */
    iconePadrao: string

    /** Recebe as categorias após o resolvimento do Observable. */
    categorias!: Categoria[]

    /** Nome do tipo em formato de classe HTML. */
    nomeTipoClasse!: string

    /** Instância do serviço de calculadora. */
    calculadora = inject(CalculadoraService)

    /**
     * Evento emitido ao enviar os dados.
     * Recebido do componente Main-Form.
     */
    @Input() enviado = new EventEmitter()

    /** FormControl de Total do Tipo. */
    totalTipo = new FormControl()

    /** 
     * Evento ao clicar no botão update. 
     * Recebido do componente Categoria.
     */
    @Output() updateEvento = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() {
        this.iconePadrao = this.global.iconePadrao
    }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        // Corrige o nome do tipo
        this.nomeTipoClasse = this.global.toClass(this.nomeTipo)

        // Criação de campos
        this.form.addControl(`total-${this.nomeTipoClasse}`, new FormControl())

        // Carrega as categorias
        this.api.getCategoriasPorIdTipo(this.idTipo)
            .subscribe(categorias => {
                this.categorias = categorias
                categorias.filter(item => item.tipo === this.nomeTipo)
            })
    }

    /**
     * Calcula o total parcial das categorias do tipo.
     */
    calculaTotais() {
        const controlTotal = this.form.get(`total-${this.nomeTipoClasse}`)
        const valores: number[] = []
        this.categorias.forEach(categoria => {
            const categoriaClasse = this.global.toClass(categoria.nome) + '-soma'
            const controlSoma = this.form.get(categoriaClasse)
            const valorNum = this.calculadora.formataToNumero(controlSoma?.value)

            valores.push(valorNum)
        })
        const soma = this.calculadora.somaSimples(...valores)
        controlTotal?.setValue(this.calculadora.formataToMoeda(soma))
    }
}
