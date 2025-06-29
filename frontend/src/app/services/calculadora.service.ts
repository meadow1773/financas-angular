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
     * @param botao 
     * @param form 
     * @param dataRequest 
     */
    somar(botao: HTMLElement, form: FormGroup, dataRequest: DataRequest) {
        // Referência dos FormControls
        const classe = (botao.parentElement!).parentElement!.classList[0]
        const control = form.get(classe)
        const controlSoma = form.get(classe + '-soma')

        // Checa se o valor recebido é numérico
        console.log(control?.value)
        const valor = parseFloat(control?.value.replace(',', '.'))
        if(isNaN(valor)) return
        
        // Acrescenta o valor ao objeto DataRequest e efetua a soma
        dataRequest.valores.push(valor)
        const soma =dataRequest.valores.reduce((a, b) => a + b, 0)
        controlSoma?.setValue(this.formataToMoeda(soma))

        // Reseta os FormControls
        control?.markAsPristine()
        control?.setValue('')
    }

    /**
     * Efetua a subtração do último valor acrescentado ao DataRequest.
     * @param botao 
     * @param form 
     * @param dataRequest 
     */
    subtrai(botao: HTMLElement, form: FormGroup, dataRequest: DataRequest) {
        // Checa se o DataRequest está vazio.
        if (dataRequest.valores.length < 1) return
        
        // Referência dos FormControls
        const classe = (botao.parentElement!).parentElement!.classList[0]
        const controlSoma = form.get(classe + '-soma')

        // Acrescenta o valor ao objeto DataRequest e efetua a soma
        dataRequest.valores.pop()
        const subtracao = dataRequest.valores.reduce((a, b) => a + b, 0)
        controlSoma?.setValue(this.formataToMoeda(subtracao))
    }

    /**
     * Formata o valor passado em parâmetro para uma string formatada em Reais.
     * @param valor 
     * @returns 
     */
    formataToMoeda(valor: number) {
        return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
    }
}
