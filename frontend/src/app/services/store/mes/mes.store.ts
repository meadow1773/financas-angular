import { Injectable } from "@angular/core"

import { Store } from "../Store"
import { MesState } from "./mes.state"

@Injectable({
    providedIn: 'root'
})

export class MesStore extends Store<MesState> {
    /**
     * Construtor da classe MesStore
     */
    constructor () {
        super(new MesState())
    }

    /**
     * Adiciona um novo objeto Date ao estado
     * @param data 
     */
    addData(data: Date) {
        this.state$.pipe()
        this.setState(new MesState(data))
    }

    /**
     * Atualiza o estado com base no número do mês
     * @param mesNum 
     */
    addMesNum(mesNum: number) {
        const novaData = new Date()
        novaData.setMonth(mesNum)
        this.setState(new MesState(novaData))
    }

    /**
     * Atualiza o estado com base no nome curto do mês
     * @param mesCurto 
     */
    addMesCurto(mesCurto: string) {
        const novaData = new Date()
        const indexMes = this.stateSnapshot.listaMesesCurto.indexOf(mesCurto)
        novaData.setMonth(indexMes)
        this.setState(new MesState(novaData))
    }

    /**
     * Atualiza o estado com base no nome longo do mês
     * @param mesLongo 
     */
    addMesLongo(mesLongo: string) {
        const novaData = new Date()
        const indexMes = this.stateSnapshot.listaMesesLongo.indexOf(mesLongo)
        novaData.setMonth(indexMes)
        this.setState(new MesState(novaData))
    }
}