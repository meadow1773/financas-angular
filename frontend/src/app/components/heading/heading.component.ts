import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-heading',
  imports: [],
  templateUrl: './heading.component.html',
  styleUrl: './heading.component.scss'
})

export class HeadingComponent implements OnInit {
  mes!: string;

  constructor(public global: GlobalService) {}
  
  ngOnInit() {
    this.mes = this.global.mesAtualStr
  }
}

