import { fakerPT_BR as faker } from '@faker-js/faker'

const listaInputs = document.querySelectorAll('input')

listaInputs.forEach(input => {
    input.addEventListener('keydown', (keyEvent) => {
        if(keyEvent.ctrlKey && keyEvent.key === '7') {
            keyEvent.preventDefault()
            if (input.readOnly) return

            input.value = faker.finance.amount({ autoFormat: true })
        }
    })
})

document.addEventListener('keydown', keyEvent => {
    if(keyEvent.ctrlKey && keyEvent.key === '9') {
        keyEvent.preventDefault()
        listaInputs.forEach(input => {
            if(input.name === 'saldo-anterior' || input.readOnly) return

            input.value = faker.finance.amount({ autoFormat: true, max: 1000})
            //ADICIONAR FUNÇÃO DE SALVAR VALORES
        })
    }
})

