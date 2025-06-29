import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

import { CategoriaComponent } from './categoria/categoria.component'
import { MainFormComponent } from './main-form/main-form.component'
import { TipoComponent } from './tipo/tipo.component'
import { ApiService } from '../../services/api.service'
import { SharedService } from '../../services/shared.service'

@NgModule({
    declarations: [
        MainFormComponent, 
        CategoriaComponent, 
        TipoComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatIconModule,
        NgxMaskDirective,
        NgxMaskPipe
    ],
    providers: [SharedService, ApiService, provideNgxMask()],
    exports: [MainFormComponent]
})
export class MainFormModule {

}
