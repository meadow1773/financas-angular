import { Component } from '@angular/core';
import { HeadingComponent } from '../heading/heading.component';
import { MainFormModule } from '../../modules/main-form/main-form.module';

@Component({
  selector: 'app-home',
  imports: [HeadingComponent, MainFormModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

}
