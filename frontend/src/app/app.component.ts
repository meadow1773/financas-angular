import { Component, inject, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Title } from  '@angular/platform-browser'
import { MatIconModule } from '@angular/material/icon'
import { DateHandlerService } from './services/date-handler.service'
import { HomeModule } from './modules/home/home.module'

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MatIconModule, HomeModule],
    providers: [],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
    /**
     * Nome do App.
     */
    appName = 'Finanças'
    /**
     * Ano para o título do App.
     */
    ano!: number
    /**
     * Instancia do serviço de Data.
     */
    private date = inject(DateHandlerService)
    /**
     * Instância do serviço de título do Angular.
     */
    private titleService = inject(Title)

    /**
     * Método construtor do componente.
     */
    constructor() {}

    /**
     * Método OnInit do componente.
     */
    ngOnInit() {
        this.ano = this.date.anoAtual
        this.titleService.setTitle(`${this.appName} ${this.ano}`)
    }
}
