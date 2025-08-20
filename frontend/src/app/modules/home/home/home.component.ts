import { Component, EventEmitter, Output } from '@angular/core'

@Component({
    standalone: false,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent{
    /** Evento disparado ao mudar de mês. */
    @Output() mesMudou = new EventEmitter()
}
