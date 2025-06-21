import { Component, inject, Input, OnInit } from '@angular/core'
import { SharedService } from '../../../services/shared.service'
import { FormControl, FormGroup } from '@angular/forms'
import { Icone } from '../../../../interfaces/models'
import { CalculadoraService } from '../../../services/calculadora.service'

@Component({
    standalone: false,
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrl: './categoria.component.scss'
})

export class CategoriaComponent implements OnInit {
    /**
     * FormGroup recebido do componente Tipo.
     */
    @Input() form!: FormGroup

    /**
     * Nome da categoria recebido do componente Tipo.
     */
    @Input() categoriaNome!: string

    /**
     * Ícone da categoria recebido do componente Tipo.
     */
    @Input() iconeCategoria!: Icone | null

    /**
     * Instância do serviço global.
     */
    global = inject(SharedService)

    /**
     * Instância do serviço de calculadora.
     */
    calculadora = inject(CalculadoraService)

    /**
     * Zero padrão.
     */
    zero: string

    /**
     * Ícone padrão para quando o Icone recebido da Api for nulo.
     */
    iconePadrao: string

    /**
     * Método construtor do componente.
     */
    constructor() {
        this.zero = this.global.zeroFormat
        this.iconePadrao = this.global.iconePadrao
    }

    /**
     * Getter para o nome do item.
     * @param classe Se 'true', retorna o nome em formato de classe HTML.
     * @returns Nome do item.
     */
    getCategoriaNome(classe?:boolean) {
        if (classe) return this.global.toClass(this.categoriaNome)
        return this.categoriaNome
    }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        // Criação de campos.
        this.form.addControl(
            this.getCategoriaNome(true),
            new FormControl('', [this.calculadora.validadorReal])
        )
        this.form.addControl(
            `${this.getCategoriaNome(true)}-soma`, new FormControl()
        )
    }
}
