import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GrupoTransacoesComponent } from '../grupo-transacoes/grupo-transacoes.component';


@Component({
  selector: 'app-main-form',
  imports: [ReactiveFormsModule, GrupoTransacoesComponent],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {

  public mainDados = new FormGroup({
    saldoAnterior: new FormControl(),
    valorAnterior: new FormControl(),
    novoValor: new FormControl(),
    saldo: new FormControl()
  });

  onSubmit(form: FormGroup) {
    console.log(form)
  }
}
