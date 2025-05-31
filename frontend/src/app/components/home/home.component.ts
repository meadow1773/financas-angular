import { Component } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { HeadingComponent } from '../heading/heading.component';
import { MainFormComponent } from '../main-form/main-form.component';

@Component({
  selector: 'app-home',
  imports: [CalendarioComponent, HeadingComponent, MainFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

}
