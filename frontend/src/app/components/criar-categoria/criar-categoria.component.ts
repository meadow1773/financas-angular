import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop'
import { CommonModule, NgForOf } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { 
    FormControl, 
    FormGroup, 
    FormsModule, 
    ReactiveFormsModule, 
    Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { firstValueFrom } from 'rxjs'

import { Categoria, Icone, Tipo } from '../../../interfaces/models'
import { CategoriasStore } from '../../services/store/categorias/categorias.store'
import { IconesStore } from '../../services/store/icones/icones.store'
import { TiposStore } from '../../services/store/tipos/tipos.store'
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component'

@Component({
    selector: 'app-criar-categoria',
    templateUrl: './criar-categoria.component.html',
    styleUrl: './criar-categoria.component.scss',
    imports: [NgForOf, FormsModule, MatIconModule, MatInputModule, MatSelectModule, 
        MatFormFieldModule, MatDialogModule, ReactiveFormsModule, CdkDrag, CdkDragHandle, 
        LoadingScreenComponent, CommonModule],
})
export class CriarCategoriaComponent implements OnInit {
    /**
     * Dados recebidos do componente pai.
     */
    data = inject(MAT_DIALOG_DATA)

    /**
     * Injeção do Store de Tipos.
     */
    private tiposStore = inject(TiposStore)

    /**
     * Injeção do Store de Ícones.
     */
    private iconesStore = inject(IconesStore)

    /**
     * Injeção do Store de Categorias.
     */
    private categoriaStore = inject(CategoriasStore)

    /**
     * Lista de tipos disponíveis para seleção.
     */
    listaTipos: Tipo[] = []

    /**
     * Lista de ícones disponíveis para seleção.
     */
    listaIcones: Icone[] = []

    /**
     * FormGroup para o formulário de criação de categoria.
     */
    formCriarCategoria = new FormGroup({
        nomeCategoria: new FormControl('', Validators.required),
        nomeTipo: new FormControl('', Validators.required),
        iconeCategoria: new FormControl<Icone | null>(null, Validators.required),
    })

    /**
     * Instância do MatDialogRef para controle do diálogo.
     */
    dialogRef = inject(MatDialogRef<CriarCategoriaComponent>)

    /**
     * Método OnInit do componente.
     */
    async ngOnInit() {
        this.listaTipos = this.tiposStore.stateSnapshot.getTipos()

        await firstValueFrom(this.iconesStore.carregarIcones())
        this.listaIcones = this.iconesStore.stateSnapshot.getIcones()
    }

    /**
     * Seleciona o ícone escolhido.
     * @param icone 
     */
    selectIcon(icone: Icone) {
        const control = this.formCriarCategoria.get('iconeCategoria')
        if (!control) return

        if (control.value === icone) {
            control.setValue(null)
        } else {
            control.setValue(icone)
        }

        control.markAsTouched()
    }

    async enviaCategoria() {
        if (this.formCriarCategoria.invalid) {
            this.formCriarCategoria.markAllAsTouched()
            return
        }
        const valorForm = this.formCriarCategoria.value
        const newCategoria:Categoria = {
            nome: valorForm.nomeCategoria!,
            nomeTipo: valorForm.nomeTipo!,
            icone: valorForm.iconeCategoria!
        }

        await firstValueFrom(this.categoriaStore.enviarCategorias([newCategoria]))
            .then(() => {
                this.formCriarCategoria.markAsPristine()
                this.dialogRef.close()
            })
            .catch(e => {
                console.error('Erro ao enviar categoria:', e)
            })
    }
}
