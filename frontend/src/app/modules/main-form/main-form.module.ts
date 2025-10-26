import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

import { CategoriaComponent } from './categoria/categoria.component'
import { InfoComponent } from './info/info.component'
import { MainFormComponent } from './main-form/main-form.component'
import { TipoComponent } from './tipo/tipo.component'
import { ApiService } from '../../services/api.service'
import { SharedService } from '../../services/shared.service'
import { CategoriasState } from '../../services/store/categorias/categorias.state'
import { MesStore } from '../../services/store/mes/mes.store'
import { TiposStore } from '../../services/store/tipos/tipos.store'
import { TransacoesStore } from '../../services/store/transacoes/transacoes.store'

@NgModule({
    declarations: [
        MainFormComponent, 
        CategoriaComponent, 
        TipoComponent,
        InfoComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        NgxMaskDirective,
        NgxMaskPipe,
        MatProgressSpinnerModule
    ],
    providers: [SharedService, ApiService, provideNgxMask(), MesStore, TransacoesStore, TiposStore, CategoriasState],
    exports: [MainFormComponent]
})
export class MainFormModule {

}
