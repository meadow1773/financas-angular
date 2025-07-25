import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { DataRequest } from '../../interfaces/dataRequest'

@Injectable({
    providedIn: 'root'
})
export class CalculadoraService {
    /**
     * Método construtor do serviço.
     */
    constructor() { }

    /**
     * Efetua a soma de valores ao DataRequest.
     * @param nomeControl 
     * @param form 
     * @param dataRequest 
     */
    somar(nomeControl: string, form: FormGroup, dataRequest: DataRequest) {
        // Referência dos FormControls
        const control = form.get(nomeControl)
        const controlSoma = form.get(nomeControl + '-soma')

        // Define o primeiro valor do DataRequest se estiver vazio
        if (dataRequest.valores.length < 1) dataRequest.valores.push(this.formataToNumero(controlSoma?.value))
        
        // Checa se o valor recebido é numérico
        const valor = Number(control?.value.replace(',', '.'))
        if(isNaN(valor)) return
        
        // Acrescenta o valor ao objeto DataRequest e efetua a soma
        dataRequest.valores.push(valor)
        const soma = dataRequest.valores.reduce((a, b) => {
            return this.inteiroParaDecimal(this.decimalParaInteiro(a) + this.decimalParaInteiro(b))
        }, 0)
        controlSoma?.setValue(this.formataToMoeda(soma))

        // Reseta os FormControls
        controlSoma?.markAsDirty()
        control?.markAsPristine()
        control?.reset()
    }

    /**
     * Efetua a subtração do último valor acrescentado ao DataRequest.
     * @param botao 
     * @param form 
     * @param dataRequest 
     */
    subtrai(nomeControl: string, form: FormGroup, dataRequest: DataRequest) {
        // Checa se o DataRequest está vazio.
        if (dataRequest.valores.length < 1) return
        
        // Referência dos FormControls
        const controlSoma = form.get(nomeControl + '-soma')

        // Acrescenta o valor ao objeto DataRequest e efetua a soma
        dataRequest.valores.pop()
        const subtracao = dataRequest.valores.reduce((a, b) => a + b, 0)
        if(dataRequest.valores.length) {
            controlSoma?.setValue(this.formataToMoeda(subtracao))
        } else {
            controlSoma?.markAsPristine()
        }
    }

    /**
     * Formata o valor passado em parâmetro para uma string formatada em Reais.
     * @param valor 
     * @returns 
     */
    formataToMoeda(valor?: number) {
        return valor?.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    }

    /**
     * Converte um número decimal (duas casas decimais) para inteiro.
     * @param decimal 
     * @param casasDecimais = 100
     * @returns 
     */
    decimalParaInteiro(decimal: number, casasDecimais = 100) {
        return Math.round(decimal * casasDecimais)
    }

    /**
     * Converte um número inteiro para decimal.
     * @param inteiro 
     * @param casasDecimais = 100
     * @returns 
     */
    inteiroParaDecimal(inteiro: number, casasDecimais = 100) {
        return inteiro / casasDecimais
    }

    /**
     * Converte uma string formatada em reais para um valor numérico.
     * @param valor 
     * @returns 
     */
    formataToNumero(valor?: string) {
        const conversao = Number(valor?.substring(3).replace('.', '').replace(',', '.'))
        if(!isNaN(conversao)) return conversao
        return 0
    }

    /**
     * Realiza somas simples com as devidas correções.
     * @param num 
     */
    somaSimples(...num: number[]) {
        return num.reduce((a, b) => {
            return this.inteiroParaDecimal(this.decimalParaInteiro(a) + this.decimalParaInteiro(b))
        }, 0)
    }
}
