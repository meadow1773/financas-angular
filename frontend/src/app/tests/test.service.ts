import { Injectable } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { fakerPT_BR as faker } from '@faker-js/faker'

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor() { }
    
    testeInput(input: HTMLInputElement) {
        input.addEventListener('keydown', (keyEv: KeyboardEvent) => {
            if (keyEv.ctrlKey &&  keyEv.key === '7') {
                keyEv.preventDefault()
                if (input.readOnly) return
                input.value = faker.finance.amount({autoFormat: true})
            }
        })
    }

    testeTodos(domInstance: Document, input: AbstractControl) {
        domInstance.addEventListener('keydown', keyEv => {
            if (keyEv.ctrlKey && keyEv.key === '9') {
                keyEv.preventDefault()
                //if (input.readOnly) return

                input.setValue(faker.finance.amount({autoFormat: true, max: 1000}))
                //gl.saveValor(input)
            }
        })
    }

}
