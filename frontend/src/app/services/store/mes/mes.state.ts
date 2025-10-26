class MesStateService {
    constructor(public data: Date) {}

    geraMesCurto (mesNum: number): string {
        const formatar = new Intl.DateTimeFormat('default', { month: 'short' })
        this.data.setMonth(mesNum)
        return formatar.format(this.data)
    }

    geraMesLongo(mesNum: number): string {
        const formatar = new Intl.DateTimeFormat('default', { month: 'long' })
        this.data.setMonth(mesNum)
        return formatar.format(this.data)
    }

    geraListaMesesCurto(): string[] {
        const mesesAno = []
        const formatar = new Intl.DateTimeFormat('default', { month: 'short' })
        for(let i = 0; i < 12; i++) {
            const data = new Date(this.data.getFullYear(), i, 1)
            const mes = formatar.format(data).replace('.', '')
            mesesAno.push(mes)
        }

        return mesesAno
    }

    geraListaMesesLongo(): string[] {
        const mesesAno = []
        const formatar = new Intl.DateTimeFormat('default', { month: 'long' })
        for(let i = 0; i < 12; i++) {
            const data = new Date(this.data.getFullYear(), i, 1)
            const mes = formatar.format(data).replace('.', '')
            mesesAno.push(mes)
        }

        return mesesAno
    }
}

export class MesState {
    mesNum: number

    mesCurto: string

    mesLongo: string

    listaMesesCurto: string[]

    listaMesesLongo: string[]

    constructor(public data = new Date()) {
        const mesStateService = new MesStateService(this.data)
        this.mesNum = this.data.getMonth()
        this.mesCurto = mesStateService.geraMesCurto(this.mesNum)
        this.mesLongo = mesStateService.geraMesLongo(this.mesNum)
        this.listaMesesCurto = mesStateService.geraListaMesesCurto()
        this.listaMesesLongo = mesStateService.geraListaMesesLongo()
    }
}