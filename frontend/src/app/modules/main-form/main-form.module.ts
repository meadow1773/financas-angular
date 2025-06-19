import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainFormComponent } from './main-form/main-form.component';
import { TipoComponent } from './tipo/tipo.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../services/shared.service';
import { ApiService } from '../../services/api.service';

@NgModule({
  declarations: [MainFormComponent, CategoriaComponent, TipoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [SharedService, ApiService],
  exports: [MainFormComponent]
})
export class MainFormModule {

}
