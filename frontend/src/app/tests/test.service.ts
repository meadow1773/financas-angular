import { Injectable } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { fakerPT_BR as faker } from '@faker-js/faker'

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor() { }
    
    testeInput(evento: KeyboardEvent, form: FormGroup) {
        if (evento.ctrlKey && evento.key === '7') {
            const input = evento.target as HTMLInputElement
            const formControl = form.get(input.name)
            input.addEventListener('keydown', (keyEv: KeyboardEvent) => {
                if (keyEv.ctrlKey &&  keyEv.key === '7') {
                    keyEv.preventDefault()
                    if (input.readOnly) return
                    formControl?.setValue(faker.finance.amount({autoFormat: true}))
                }
            })
        }
    }

    testeTodos(domInstance: Document, form: FormGroup, controlName: string) {
        const formControl = form.get(controlName)
        const botaoAdd = domInstance.querySelector(`button[name=${controlName}].add`)
        domInstance.addEventListener('keydown', keyEv => {
            if (keyEv.ctrlKey && keyEv.key === '9') {
                keyEv.preventDefault()
                if (formControl?.getRawValue()) return

                formControl?.setValue(faker.finance.amount({autoFormat: true, max: 1000}))
                botaoAdd?.dispatchEvent(new MouseEvent('click'))
            }
        })
    }

}
