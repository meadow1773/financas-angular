import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home/home.component'
import { HeadingComponent } from './heading/heading.component'
import { CalendarioComponent } from './calendario/calendario.component'
import { MainFormModule } from '../main-form/main-form.module'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
    declarations: [HomeComponent, HeadingComponent, CalendarioComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MainFormModule
    ],
    exports: [HomeComponent]
})
export class HomeModule { }
