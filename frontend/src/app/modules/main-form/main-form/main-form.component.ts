import { Component, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { SharedService } from '../../../services/shared.service'
import { Tipo } from '../../../../interfaces/models'
import { ApiService } from '../../../services/api.service'

@Component({
    standalone: false,
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.scss'
})
export class MainFormComponent implements OnInit {
    /**
     * Zero padrão.
     */
    zero:string

    /**
     * Tipos de transação recebidos da Api.
     */
    tipos!:Tipo[]

    /**
     * Instância do serviço global.
     */
    global = inject(SharedService)

    /**
     * Instância do serviço de Api.
     */
    private api = inject(ApiService)

    /**
     * FormGroup principal que recebera os FromControls dos outros componentes.
     */
    formularioPrincipal = new FormGroup({
        "saldo-anterior": new FormControl(),
        saldo: new FormControl()
    })

    /**
     * Método construtor do componente.
     */
    constructor() {
        this.zero = this.global.zeroFormat
    }

    /**
     * Método de teste de envio.
     */
    testSubmit() {
        console.log(this.formularioPrincipal.value)
    }

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
    // Carrega os tipos
        const tipos = this.api.getTipos()
        tipos.subscribe(array => this.tipos = array)
    }
}
