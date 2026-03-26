import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MatDialog} from '@angular/material/dialog'
import { firstValueFrom, Subject, takeUntil } from 'rxjs'

import { Categoria, Icone } from '../../../../interfaces/models'
import { 
    CriarCategoriaComponent
} from '../../../components/criar-categoria/criar-categoria.component'
import { CalculadoraService } from '../../../services/calculadora.service'
import { SharedService } from '../../../services/shared.service'
import { CategoriasStore } from '../../../services/store/categorias/categorias.store'

@Component({
    standalone: false,
    selector: 'app-tipo',
    templateUrl: './tipo.component.html',
    styleUrl: './tipo.component.scss'
})
export class TipoComponent implements OnInit, OnDestroy{
    /** FormGrup recebido do componente MainForm. */
    @Input() form!: FormGroup

    /** Nome do Tipo recebido do componente MainForm. */
    @Input() @Output() nomeTipo!:string

    /** Icone do Tipo recebido do componente MainForm. */
    @Input() iconeTipo!: Icone | null

    /** Id do Tipo recebido do componente MainForm. */
    @Input() idTipo!: number

    /**
     * Evento ao clicar os botões add ou rmv
     * Recebido do componente Categoria.
     */
    @Output() alterou = new EventEmitter()

    /** Instância do store de categorias. */
    private categoriasStore = inject(CategoriasStore)

    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Ícone padrão para quando o Icone recebido da Api for nulo. */
    iconePadrao: string

    /** Recebe as categorias após o resolvimento do Observable. */
    categorias?: Categoria[]

    /** Nome do tipo em formato de classe HTML. */
    nomeTipoClasse!: string

    /** Instância do serviço de calculadora. */
    calculadora = inject(CalculadoraService)

    /** FormControl de Total do Tipo. */
    totalTipo = new FormControl()

    /** 
     * Evento ao clicar no botão update. 
     * Recebido do componente Categoria.
     */
    @Output() updateEvento = new EventEmitter()

    /** Evento ao receber as Transações. */
    @Output() transacoesOk = new EventEmitter()

    /** Instância do MatDialog. */
    dialog = inject(MatDialog)

    /** Gerenciador de subscrições do componente. */
    private destroy$ = new Subject<void>()

    /**
     * Método construtor do componente.
     */
    constructor() {
        this.iconePadrao = this.global.iconePadrao
    }

    /**
     * Método OnInit do componente.
     */
    async ngOnInit() {
        // Corrige o nome do tipo
        this.nomeTipoClasse = this.global.toClass(this.nomeTipo)

        // Criação de campos
        this.form.addControl(`total-${this.nomeTipoClasse}`, new FormControl())

        // Carrega as categorias
        await firstValueFrom(this.categoriasStore.carregarCategorias(this.idTipo))
        this.categoriasStore.state$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(state => {
            const listaCategorias = state.getCategorias()
            this.categorias = listaCategorias[this.nomeTipo]
        })
    }

    /**
     * Calcula o total parcial das categorias do tipo.
     */
    calculaTotais() {
        const controlTotal = this.form.get(`total-${this.nomeTipoClasse}`)
        const valores: number[] = []
        this.categorias?.forEach(categoria => {
            const categoriaClasse = this.global.toClass(categoria.nome) + '-soma'
            const controlSoma = this.form.get(categoriaClasse)
            const valorNum = this.calculadora.formataToNumero(controlSoma?.value)

            valores.push(valorNum)
        })
        const soma = this.calculadora.somaSimples(...valores)
        controlTotal?.setValue(this.calculadora.formataToMoeda(soma))
    }

    /**
     * Abre o diálogo para criar uma nova categoria do tipo.
     */
    criarCategoria() {
        this.dialog.open(CriarCategoriaComponent, {
            data: {
                nomeTipo: this.nomeTipo
            }
        })
    }

    /**
     * Método OnDestroy do componente.
     */
    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }
}
