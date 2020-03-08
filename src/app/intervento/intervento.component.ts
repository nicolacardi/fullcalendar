import { Component, OnInit } from '@angular/core';
import { InterventoTipo } from '../models/models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-intervento',
  templateUrl: './intervento.component.html',
  styleUrls: ['./intervento.component.css']
})


export class InterventoComponent implements OnInit {

  intervento: InterventoTipo;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.intervento =  this.route.snapshot.data['intervento'];
  }

}
