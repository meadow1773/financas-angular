import { Component } from '@angular/core';
import { HeadingComponent } from '../heading/heading.component';
import { MainFormComponent } from '../main-form/main-form.component';

@Component({
  selector: 'app-home',
  imports: [HeadingComponent, MainFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

}
