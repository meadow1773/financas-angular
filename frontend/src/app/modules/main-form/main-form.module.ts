import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainFormComponent } from './main-form/main-form.component';
import { GrupoTransacoesComponent } from './grupo-transacoes/grupo-transacoes.component';
import { ItemComponent } from './item/item.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from '../../services/shared.service';

@NgModule({
  declarations: [MainFormComponent, ItemComponent, GrupoTransacoesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [SharedService],
  exports: [MainFormComponent]
})
export class MainFormModule {

}
