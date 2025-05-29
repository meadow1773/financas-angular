import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from  '@angular/platform-browser';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  appName = 'Finanças';
  ano!: number;

  constructor(private titleService:Title, public global: GlobalService) {}

  
  ngOnInit() {
    this.ano = this.global.anoAtual
    this.titleService.setTitle(`${this.appName} ${this.ano}`)
  }
}
