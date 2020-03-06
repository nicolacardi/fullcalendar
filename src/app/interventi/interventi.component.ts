import { Component, OnInit, Input } from '@angular/core';
import { InterventoTipo } from '../models/models';

@Component({
  selector: 'app-interventi',
  templateUrl: './interventi.component.html',
  styleUrls: ['./interventi.component.css']
})
export class InterventiComponent implements OnInit {

  @Input()
  interventi: InterventoTipo[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
