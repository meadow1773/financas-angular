import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

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
    /** Flag que indica se o componente está ou não carregando */
    carregando = false

    /** Array que receberá todos os DataRequest gerados para envio. */
    mainDataRequestArray: DataRequest[] = []
    
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

    /** Evento emitido ao enviar os dados. */
    @Output() enviado = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() {}

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        this.carregando = true
        // Carrega os tipos
        this.api.getTipos().subscribe(tipos => {
            this.tipos = tipos

            this.carregando = false
        })
    }

    /**
     * Recebe os objetos DataRequest das categorias e adiciona ao DataRequestArray.
     * @param recebido 
     */
    dataReceiver(recebido: DataRequest) {
        const cadastrado = this.mainDataRequestArray.find(data => data.categoria === recebido.categoria)
        if (cadastrado) {
            cadastrado.valores = recebido.valores
        } else {
            this.mainDataRequestArray.push(recebido)
        }
    }

    /**
     * Envia o array de DataRequest para a Api.
     */
    enviaValores(dataRequest?: DataRequest) {
        this.carregando = true
        
        const arrayFunction: DataRequest[] = []
        if (dataRequest) {
            arrayFunction.push(dataRequest)
        } else {
            arrayFunction.push(...this.mainDataRequestArray)
            arrayFunction.forEach(data => data.valores.shift())
        }
        if (!arrayFunction.length) return

        this.api.setTransacoes(arrayFunction)
            .subscribe(() => {
                this.enviado.emit()
                this.carregando = false
            })
        this.formularioPrincipal.markAsPristine()
    }

    /**
     * Limpa apenas os valores dos FormControls editáveis.
     * @param evento 
     */
    limpaValores(evento: Event) {
        evento.preventDefault()
        const formData = this.formularioPrincipal.getRawValue()
        const chaves = Object.keys(formData)

        chaves.forEach(chave => {
            if(!chave.endsWith('soma')) this.formularioPrincipal.get(chave)?.reset()
        })
    }

    /**
     * 
     */
    updateSaldoAnterior() {
        const date = new Date()
        const dataRequestSaldo: DataRequest = {
            categoria: 'Saldo Anterior',
            mes: date.getMonth(),
            ano: date.getFullYear(),
            valores: [],
            descricao: [''],
            dataCadastro: date
        }
        const valorFormatado = Number((this.formularioPrincipal.get('saldo-anterior')?.value as string | undefined)?.replace(',', '.') ?? '')
        dataRequestSaldo.valores.push(valorFormatado)

        this.enviaValores(dataRequestSaldo)
    }

    /**
     * 
     */
    calculaSaldo() {

    }
}
