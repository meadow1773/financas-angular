import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MainFormComponent } from './main-form/main-form.component'
import { TipoComponent } from './tipo/tipo.component'
import { CategoriaComponent } from './categoria/categoria.component'
import { MatIconModule } from '@angular/material/icon'
import { SharedService } from '../../services/shared.service'
import { ApiService } from '../../services/api.service'
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask'

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
