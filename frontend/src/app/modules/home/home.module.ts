import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatIconModule } from '@angular/material/icon'

import { CalendarioComponent } from './calendario/calendario.component'
import { HeadingComponent } from './heading/heading.component'
import { HomeComponent } from './home/home.component'
import { CategoriasStore } from '../../services/store/categorias/categorias.store'
import { MesStore } from '../../services/store/mes/mes.store'
import { TransacoesStore } from '../../services/store/transacoes/transacoes.store'
import { MainFormModule } from '../main-form/main-form.module'

@NgModule({
    declarations: [
        HomeComponent, 
        HeadingComponent, 
        CalendarioComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MainFormModule
    ],
    exports: [HomeComponent],
    providers: [MesStore, TransacoesStore, CategoriasStore]
})
export class HomeModule { }
