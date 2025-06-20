import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { SharedService } from '../../../services/shared.service'
import { ApiService } from '../../../services/api.service'
import { Tipo } from '../../../../interfaces/models'

@Component({
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.scss',
    standalone: false
})
export class MainFormComponent {
    zero:string
    tipos!:Tipo[]

    /**
   * FormGroup principal que recebera os FromControls dos outros componentes.
   */
    formularioPrincipal = new FormGroup({
        "saldo-anterior": new FormControl(),
        saldo: new FormControl()
    })

    constructor(public global:SharedService, private api: ApiService) {
        this.zero = global.zeroFormat
    }

    testSubmit() {
        console.log(this.formularioPrincipal.value)
    }

    ngOnInit() {
    // Carrega os tipos
        const tipos = this.api.getTipos()
        tipos.subscribe(array => this.tipos = array)
    }
}
