import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-form',
  imports: [ReactiveFormsModule],
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss'
})
export class MainFormComponent {
  mainDados = new FormGroup({
    saldoAnterior: new FormControl(),
    totalReceitas: new FormControl(),
    totalDespesas: new FormControl(),
    investimentos: new FormControl(),
    saldo: new FormControl(),
  });

  onSubmit(form: FormGroup) {
    console.log(form)
  }
}
