import { Injectable } from '@angular/core'
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms'

@Injectable({
    providedIn: 'root'
})
export class CalculadoraService {
    /**
     * Método construtor do serviço.
     */
    constructor() { }

    /**
    * Valida valores que passam no regex monetário (R$).
    * @returns Função validadora
    */
    validadorReal(campo: AbstractControl): ValidationErrors | null {
        const valor = campo.value
        const regex = /^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/
        if(!valor) return null
        if(regex.test(valor.replace('R$', '').trim())) {
            return null
        } else {
            return { invalidCurrency: true }
        }
    }

    /**
    * Formata o valor digitado no FormControl ao ser acionado por um evento.
    * @param evento
    * @param form
    */
    formatarReal(evento: any, form: FormGroup) {
        const valor = evento.target.value.replace(/\D/g, '')
        if (valor) {
            const valorFormatado = `R$${Number(valor / 100)
                .toFixed(2)
                .replace('.', ',')
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
            }`
            form.get('currency')?.setValue(valorFormatado, { emitEvent: false })
        }
    }
}
