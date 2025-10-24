import { MesStateService } from "./mes.state.service"

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