import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { firstValueFrom } from 'rxjs'

import { Categoria, Icone } from '../../../../interfaces/models'
import { ApiService } from '../../../services/api.service'
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
     * Evento ao clicar no botão Add.
     * Recebido do componente Categoria.
     */
    @Output() addEvent = new EventEmitter()

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
        this.categorias = await firstValueFrom(this.api.getCategoriasPorIdTipo(this.idTipo))
        this.categorias.filter(item => item.tipo === this.nomeTipo)
    }
}
