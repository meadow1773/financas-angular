import { DOCUMENT } from '@angular/common'
import { AfterViewInit, Component, EventEmitter, inject, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { firstValueFrom, lastValueFrom } from 'rxjs'

import { DataRequest } from '../../../../interfaces/dataRequest'
import { Tipo } from '../../../../interfaces/models'
import { CalculadoraService } from '../../../services/calculadora.service'
import { SharedService } from '../../../services/shared.service'
import { MesStore } from '../../../services/store/mes/mes.store'
import { TiposStore } from '../../../services/store/tipos/tipos.store'
import { TransacoesStore } from '../../../services/store/transacoes/transacoes.store'

@Component({
    standalone: false,
    selector: 'app-main-form',
    templateUrl: './main-form.component.html',
    styleUrl: './main-form.component.scss'
})
export class MainFormComponent implements OnInit, AfterViewInit {
    /** Array que receberá todos os DataRequest gerados para envio. */
    mainDataRequestArray: DataRequest[] = []

    /** Tipos de transação recebidos da Api. */
    tipos!: Tipo[]

    /** Instância do serviço global. */
    global = inject(SharedService)

    /** Instância da store de mês. */
    private mesStore = inject(MesStore)

    /** Instância da store de tipos. */
    private tiposStore = inject(TiposStore)

    private transacoesStore = inject(TransacoesStore)

    /** FormGroup principal que recebera os FromControls dos outros componentes. */
    formularioPrincipal = new FormGroup({
        saldo: new FormControl()
    })

    /** Instância do serviço de Calculadora. */
    private calculadora = inject(CalculadoraService)

    /** Instância do objeto DOM */
    dom = inject(DOCUMENT)

    /**  */
    proximoMes = new EventEmitter()

    /**  */
    mesAnterior = new EventEmitter()

    /**
     * Método construtor do componente.
     */
    constructor() { }

    /**
     * Método OnInit do componente.
     */
    async ngOnInit() {
        // Carrega os tipos
        await lastValueFrom(this.tiposStore.carregarTipos())
        this.tipos = this.tiposStore.stateSnapshot.getTipos()
    }

    /**
     * Recebe os objetos DataRequest das categorias e adiciona ao DataRequestArray.
     * @param recebido 
     */
    dataReceiver(recebido: DataRequest) {
        recebido.mes = this.mesStore.stateSnapshot.mesNum

        const cadastrado = this.mainDataRequestArray.find(
            data => data.categoria === recebido.categoria
        )
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

        await firstValueFrom(this.transacoesStore.enviarTransacoes(dataRequestArray))
        this.formularioPrincipal.markAsPristine()
    }

    /**
     * Método AfterViewInit do componente.
     */
    ngAfterViewInit() {
        // Atalhos de teclado
        this.dom.addEventListener('keydown', keyEv => {
            // Delete
            if (keyEv.shiftKey && keyEv.key === 'Delete') {
                keyEv.preventDefault()
                this.limpaValores()
            }

            // Setas
            if (keyEv.key === 'ArrowRight') {
                keyEv.preventDefault()
                this.proximoMes.emit()
            }
            if (keyEv.key === 'ArrowLeft') {
                keyEv.preventDefault()
                this.mesAnterior.emit()
            }
        })
    }

    /**
     * Limpa apenas os valores dos FormControls editáveis.
     * @param evento 
     */
    limpaValores(evento?: MouseEvent) {
        evento?.preventDefault()
        const formData = this.formularioPrincipal.getRawValue()

        Object.keys(formData).forEach(key => {
            if (key.endsWith('soma')) {
                const data = this.mainDataRequestArray.filter(
                    data => key.includes(this.global.toClass(data.categoria))
                ).at(0)
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
        const valorFormatado = Number(
            (this.formularioPrincipal.get('saldo-anterior')?.value as string | undefined)
                ?.replace(',', '.') ?? ''
        )
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
