import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from '../../services/shared.service';
import { MainFormComponent } from './main-form/main-form.component';
import { FormService } from '../../services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { GrupoTransacoesComponent } from './grupo-transacoes/grupo-transacoes.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MainFormComponent, ItemComponent, GrupoTransacoesComponent],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  providers: [SharedService, FormService],
  exports: [MainFormComponent]
})
export class MainFormModule {

}
