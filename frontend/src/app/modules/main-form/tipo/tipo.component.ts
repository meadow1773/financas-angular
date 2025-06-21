import { Component, inject, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { SharedService } from '../../../services/shared.service'
import { ApiService } from '../../../services/api.service'
import { Categoria, Icone } from '../../../../interfaces/models'

@Component({
    standalone: false,
    selector: 'app-tipo',
    templateUrl: './tipo.component.html',
    styleUrl: './tipo.component.scss'
})
export class TipoComponent implements OnInit{
    /**
     * FormGrup recebido do componente MainForm.
     */
    @Input() form!: FormGroup

    /**
     * Nome do Tipo recebido do componente MainForm.
     */
    @Input() nomeTipo!:string

    /**
     * Icone do Tipo recebido do componente MainForm.
     */
    @Input() iconeTipo!: Icone | null

    /**
     * Id do Tipo recebido do componente MainForm.
     */
    @Input() idTipo!: number

    /**
     * Instância do serviço de Api.
     */
    private api = inject(ApiService)

    /**
     * Instância do serviço global.
     */
    global = inject(SharedService)

    /**
     * Ícone padrão para quando o Icone recebido da Api for nulo.
     */
    iconePadrao: string

    /**
     * Recebe as categorias após o resolvimento do Observable.
     */
    categorias!: Categoria[]

    /**
     * Método construtor do componente.
     */
    constructor() {
        this.iconePadrao = this.global.iconePadrao
    }

    /**
     * Getter para o nome do grupo.
     * @param classe Se 'true', retorna o nome em formato de classe HTML.
     * @returns Nome do grupo.
     */
    getNomeTipo(classe?:boolean) {
        if (classe) return this.global.toClass(this.nomeTipo)
        else return this.nomeTipo
    }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        // Carrega as categorias
        const categorias = this.api.getCategoriasPorIdTipo(this.idTipo)
        categorias.subscribe(array => {
            this.categorias = array.filter(item => item.tipo === this.nomeTipo)
        })

        // Criação de campos
        this.form.addControl(`total-${this.getNomeTipo(true)}`, new FormControl())
    }
}
