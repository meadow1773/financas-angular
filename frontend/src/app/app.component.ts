import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from  '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { DataHandlerService } from './services/data-handler.service';
import { HomeModule } from './modules/home/home.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, HomeModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  /**
   * Nome do App
   */
  appName = 'Finanças'
  /**
   * Ano para o título do App
   */
  ano!: number
  /**
  * Instancia do serviço de data
  */
  private Data = new DataHandlerService()
  
  constructor(private titleService:Title) { }
  
  ngOnInit() {
    this.ano = this.Data.anoAtual
    this.titleService.setTitle(`${this.appName} ${this.ano}`)
  }
}
