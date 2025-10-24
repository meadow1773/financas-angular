import { DOCUMENT } from '@angular/common'
import { AfterViewInit, Component, EventEmitter, inject, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { firstValueFrom } from 'rxjs'

import { DataRequest } from '../../../../interfaces/dataRequest'
import { Tipo } from '../../../../interfaces/models'
import { ApiService } from '../../../services/api.service'
import { CalculadoraService } from '../../../services/calculadora.service'
import { SharedService } from '../../../services/shared.service'
import { MesStore } from '../../../services/store/mes/mes.store'
import { TiposStore } from '../../../services/store/tipos/tipos.store'

@Component({
    standalone: false,
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.scss'
})
export class MainFormComponent implements OnInit, AfterViewInit {
    /** Flag que indica se o componente está ou não carregando */
    carregando = false

    /** Array que receberá todos os DataRequest gerados para envio. */
    mainDataRequestArray: DataRequest[] = []

    /** Tipos de transação recebidos da Api. */
    tipos!: Tipo[]

    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Instância do serviço de Api. */
    private api = inject(ApiService)

    private mesStore = inject(MesStore)

    private tiposStore = inject(TiposStore)

    /** FormGroup principal que recebera os FromControls dos outros componentes. */
    formularioPrincipal = new FormGroup({
        saldo: new FormControl()
    })

    /** Evento emitido ao enviar os dados. */
    @Output() enviado = new EventEmitter()

    /** Instância do serviço de Calculadora. */
    private calculadora = inject(CalculadoraService)

    /** Instância do objeto DOM */
    dom = inject(DOCUMENT)

    /**
     * Método construtor do componente.
     */
    constructor() { }

    /**
     * Método OnInit do componente.
     */
    async ngOnInit() {
        // Carrega os tipos
        await firstValueFrom(this.tiposStore.carregarTipos())
        this.tiposStore.state$.subscribe(state => {
            this.tipos = state.getTipos()
        })
    }

    /**
     * Recebe os objetos DataRequest das categorias e adiciona ao DataRequestArray.
     * @param recebido 
     */
    dataReceiver(recebido: DataRequest) {
        recebido.mes = this.mesStore.stateSnapshot.mesNum

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
    async enviaValores(dataRequest?: DataRequest) {
        const dataRequestArray: DataRequest[] = []
        if (dataRequest) {
            dataRequestArray.push(dataRequest)
        } else {
            dataRequestArray.push(...this.mainDataRequestArray)
            dataRequestArray.forEach(data => data.valores.shift())
        }
        if (!dataRequestArray.length) return

        await firstValueFrom(this.api.setTransacoes(dataRequestArray))
        this.enviado.emit()
        this.formularioPrincipal.markAsPristine()
    }

    /**
     * Método AfterViewInit do componente.
     */
    ngAfterViewInit() {
        // Atalhos de teclado
        this.dom.addEventListener('keydown', keyEv => {
            if (keyEv.shiftKey && keyEv.key === 'Delete') {
                keyEv.preventDefault()
                this.limpaValores()
            }
        })
    }

    /**
     * Limpa apenas os valores dos FormControls editáveis.
     * @param evento 
     */
    limpaValores(evento?: Event) {
        evento?.preventDefault()
        const formData = this.formularioPrincipal.getRawValue()

        Object.keys(formData).forEach(key => {
            if (key.endsWith('soma')) {
                const data = this.mainDataRequestArray.filter(data => key.includes(this.global.toClass(data.categoria))).at(0)
                const valores = data?.valores
                const valorFormatado = this.calculadora.formataToMoeda((valores?.at(0)))
                this.formularioPrincipal.get(key)?.setValue(valorFormatado)
                this.formularioPrincipal.get(key)?.markAsPristine()
                valores?.splice(1)
            } else if (key.startsWith('total')) {
                this.calculaSaldo()
            } else {
                if (key === 'saldo') return
                this.formularioPrincipal.get(key)?.reset()
            }
        })
    }

    /**
     * Método que envia o valor de Saldo Anterior.
     */
    enviaSaldoAnterior() {
        const data = this.mesStore.stateSnapshot.data
        const dataRequestSaldo: DataRequest = {
            categoria: 'Saldo Anterior',
            mes: this.mesStore.stateSnapshot.mesNum,
            ano: data.getFullYear(),
            valores: [],
            descricao: [''],
            dataCadastro: data
        }
        const valorFormatado = Number((this.formularioPrincipal.get('saldo-anterior')?.value as string | undefined)?.replace(',', '.') ?? '')
        dataRequestSaldo.valores.push(valorFormatado)

        this.enviaValores(dataRequestSaldo)
    }

    /**
     * Calcula o valor de saldo.
     */
    calculaSaldo() {
        const formData: { [chave: string]: string } = this.formularioPrincipal.getRawValue()
        let receitas = 0
        let despesas = 0
        for (const chave in formData) {
            if (chave.startsWith('total')) {
                const valor = this.calculadora.formataToNumero(formData[chave])
                if (chave.endsWith('receitas')) {
                    receitas += valor
                } else {
                    despesas += valor
                }
            }
            const saldo = receitas - despesas
            const saldoFormatado = this.calculadora.formataToMoeda(saldo)
            this.formularioPrincipal.get('saldo')?.setValue(saldoFormatado)
        }
    }
}
