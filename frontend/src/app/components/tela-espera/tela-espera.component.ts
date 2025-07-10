import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-tela-espera',
    imports: [NgIf],
    styleUrl: './tela-espera.component.scss',
    template: `
    <div class="tela" *ngIf="carregando">
      <div class="loader"></div>
    </div>
    `
})
export class TelaEsperaComponent {
    /** Receberá a flag indicando se o o componente será ou não habilitado. */
    @Input() carregando = false
}
