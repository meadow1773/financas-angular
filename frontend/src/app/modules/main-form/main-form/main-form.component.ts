import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss',
  standalone: false
})
export class MainFormComponent {
  zero!:string;

  formularioPrincipal = new FormGroup({
    "saldo-anterior": new FormControl(),
    saldo: new FormControl()
  })

  constructor(public global:SharedService) {
    this.zero = global.zeroFormat;
  }

  testSubmit() {
    console.log(this.formularioPrincipal.value);
  }
}
