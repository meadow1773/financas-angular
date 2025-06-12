import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()

export class FormService {
  formularioPrincipal = new FormGroup({
    saldoAnterior: new FormControl(),
    totalGeral: new FormControl(),
    investimentos: new FormControl(),
    saldo: new FormControl(),
    fecharMes: new FormControl()
  })

  constructor() { }
}
