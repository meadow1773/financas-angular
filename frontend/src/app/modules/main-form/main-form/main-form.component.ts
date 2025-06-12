import { Component } from '@angular/core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrl: './main-form.component.scss',
  standalone: false
})
export class MainFormComponent {
  constructor(public form: FormService) {}
}
