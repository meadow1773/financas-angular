import { Icone } from "../../../../interfaces/models"

export class IconesState {
    private loading: boolean = false
    private erros: Error[] = []
    private icones: Icone[] = []

    getLoading() { return this.loading }
        
    getErros() { return this.erros }
    
    getIcones() { return this.icones }
    
    setLoading(loading: boolean) { this.loading = loading }
    
    setErros(erro: Error) { this.erros.push(erro) }
    
    setIcones(listaIcones: Icone[]) { this.icones.push(...listaIcones) }
}