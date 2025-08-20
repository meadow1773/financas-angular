import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    /** Material Icon padrão */
    iconePadrao = 'attach_money'

    /** Objeto com a data atual. */
    private data = new Date()

    /** Recebe o mês selecionado atualmente. */
    private mesAtual!: number

    /**
     * Método construtor do serviço.
     */
    constructor() { }

    /** 
     * Getter para objeto de data.
     * @returns
     */
    getData() { return this.data }

    /** 
     * Getter para mês atualmente selecionado.
     * @returns
    */
    getMesAtual() { return this.mesAtual }

    /** Setter para mês atualmente selecionado.
     * @param mes
     */
    setMesAtual(mes: number) { this.mesAtual = mes }

    /**
     * Gera um array com os meses abreviados, de acordo com o idioma local.
     * @returns 
     */
    geraMesesCurto(): string[] {
        const mesesAno = []
        const formatar = new Intl.DateTimeFormat('default', { month: 'short' })
        for(let i = 0; i < 12; i++) {
            const data = new Date(this.data.getFullYear(), i, 1)
            const mes = formatar.format(data).replace('.', '')
            mesesAno.push(mes)
        }

        return mesesAno
    }
    
    /**
     * Gera um array com os meses abreviados, de acordo com o idioma local.
     * @returns 
     */
    geraMesesLongo(): string[] {
        const mesesAno = []
        const formatar = new Intl.DateTimeFormat('default', { month: 'long' })
        for(let i = 0; i < 12; i++) {
            const data = new Date(this.data.getFullYear(), i, 1)
            const mes = formatar.format(data).replace('.', '')
            mesesAno.push(mes)
        }

        return mesesAno
    }

    /**
     * Método para transformar textos formatados em classes para uso no HTML.
     * @param texto Texto com formatação padrão
     * @returns Texto em formato de classe
     */
    toClass (texto:string) {
        return texto.toLowerCase().replace(/\s/g,'-').normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    }

    /**
     * Retorna o mês formatado em valor de texto longo.
     * @param mes 
     * @returns 
     */
    formataMesLongo(mes: number): string {
        const formatar = new Intl.DateTimeFormat('default', { month: 'long' })
        this.data.setMonth(mes)
        return formatar.format(this.data)
    }

    /**
     * Retorna o mês formatado em valor de texto curto.
     * @param mes 
     * @returns 
     */
    formataMesCurto(mes: number): string {
        const formatar = new Intl.DateTimeFormat('default', { month: 'short' })
        this.data.setMonth(mes)
        return formatar.format(this.data)
    }

    /**
     * Retorna o valor numérico referente ao mês do ano em formato curto (index 0).
     * @param mes 
     * @returns 
     */
    getNumeroMesCurto(mes: string): number {
        const mesesAno = this.geraMesesCurto()
        return mesesAno.indexOf(mes)
    }

    /**
     * Retorna o valor numérico referente ao mês do ano em formato longo (index 0).
     * @param mes 
     * @returns 
     */
    getNumeroMesLongo(mes: string): number {
        const mesesAno = this.geraMesesLongo()
        return mesesAno.indexOf(mes)
    }
}
