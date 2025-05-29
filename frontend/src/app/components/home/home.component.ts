import { Component } from '@angular/core';
import { CalendarioComponent } from '../calendario/calendario.component';
import { HeadingComponent } from '../heading/heading.component';
import { MainFormModule } from '../../modules/main-form/main-form.module';

@Component({
  selector: 'app-home',
  imports: [CalendarioComponent, HeadingComponent, MainFormModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

}
