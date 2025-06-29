import { Component, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { firstValueFrom } from 'rxjs'

import { DataRequest } from '../../../../interfaces/dataRequest'
import { Tipo } from '../../../../interfaces/models'
import { ApiService } from '../../../services/api.service'
import { SharedService } from '../../../services/shared.service'

@Component({
    standalone: false,
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.scss'
})
export class MainFormComponent implements OnInit {
    /** Array que receberá todos os DataRequest gerados para envio. */
    dataRequestArray: DataRequest[] = []
    
    /** Tipos de transação recebidos da Api. */
    tipos!:Tipo[]
    
    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    /** FormGroup principal que recebera os FromControls dos outros componentes. */
    formularioPrincipal = new FormGroup({
        saldo: new FormControl()
    })

    /**
     * Método construtor do componente.
     */
    constructor() {}

    /**
     * Método OnInit do componente.
     */
    async ngOnInit() : Promise<any>{
        // Carrega os tipos
        this.tipos = await firstValueFrom(this.api.getTipos())

        // Carrega as transações

    }

    /**
     * Recebe os objetos DataRequest das categorias e adiciona ao DataRequestArray.
     * @param recebido 
     */
    dataReceiver(recebido: DataRequest) {
        const cadastrado = this.dataRequestArray.find(data => data.categoria === recebido.categoria)
        if (cadastrado) {
            cadastrado.valores = recebido.valores
        } else {
            this.dataRequestArray.push(recebido)
        }
    }

    /**
     * Envia o array de DataRequest para a Api.
     */
    async enviaValores(): Promise<void> {
        if (!this.dataRequestArray.length) return
        await firstValueFrom(this.api.setTransacoes(this.dataRequestArray))
    }
}
