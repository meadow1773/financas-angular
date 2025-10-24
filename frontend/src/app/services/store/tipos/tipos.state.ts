import { Tipo } from "../../../../interfaces/models"


export class TiposState {
    private loading: boolean = false
    private erros: Error[] = []
    private tipos: Tipo[] = []

    constructor() { }
        
    getLoading() { return this.loading }
        
    getErros() { return this.erros }
    
    getTipos() { return this.tipos }
    
    setLoading(loading: boolean) { this.loading = loading }
    
    setErros(erro: Error) { this.erros.push(erro) }
    
    setTipos(listaTipos: Tipo[]) { this.tipos.push(...listaTipos) }
}