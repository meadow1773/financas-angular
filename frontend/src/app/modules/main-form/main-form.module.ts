import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatTableModule } from '@angular/material/table'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

import { CategoriaComponent } from './categoria/categoria.component'
import { DetalheComponent } from './detalhe/detalhe.component'
import { MainFormComponent } from './main-form/main-form.component'
import { TipoComponent } from './tipo/tipo.component'
import { LoadingScreenComponent } from '../../components/loading-screen/loading-screen.component'
import { ApiService } from '../../services/api.service'
import { SharedService } from '../../services/shared.service'
import { CategoriasStore } from '../../services/store/categorias/categorias.store'
import { MesStore } from '../../services/store/mes/mes.store'
import { TiposStore } from '../../services/store/tipos/tipos.store'
import { TransacoesStore } from '../../services/store/transacoes/transacoes.store'

@NgModule({
    declarations: [
        MainFormComponent, 
        CategoriaComponent, 
        TipoComponent,
        DetalheComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        NgxMaskDirective,
        NgxMaskPipe,
        MatProgressSpinnerModule,
        MatTableModule,
        LoadingScreenComponent
    ],
    providers: [SharedService, ApiService, provideNgxMask(), MesStore, TransacoesStore, TiposStore, CategoriasStore],
    exports: [MainFormComponent]
})
export class MainFormModule {

}
