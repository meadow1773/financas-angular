import { Categoria } from "../../../../interfaces/models"

export interface ListaCategorias {
    [tipo: string] : Categoria[];
}

export class CategoriasState {
    private loading: boolean = false
    private erros: Error[] = []
    private categorias: ListaCategorias = {}
    
    getLoading() { return this.loading }
            
    getErros() { return this.erros }
        
    getCategorias() { return this.categorias }
        
    setLoading(loading: boolean) { this.loading = loading }
        
    setErros(erro: Error) { this.erros.push(erro) }
        
    setCategorias(listaCategorias: ListaCategorias) {
        for (const tipo in listaCategorias) {
            this.categorias[tipo] = [...(this.categorias[tipo] || []), ...(listaCategorias[tipo] || [])]
        }
    }
}