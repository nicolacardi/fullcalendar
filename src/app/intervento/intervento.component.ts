import { Component, OnInit } from '@angular/core';
import { InterventoTipo, RicambioTipo } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { InterventiService } from '../shared/interventi.service';

@Component({
  selector: 'app-intervento',
  templateUrl: './intervento.component.html',
  styleUrls: ['./intervento.component.css']
})


export class InterventoComponent implements OnInit {

  intervento: InterventoTipo;
  ricambi: RicambioTipo[];
  displayedColumns = ['seqNo', 'Pezzo', 'Descrizione', 'Valore']

  constructor(private route: ActivatedRoute,
    private interventiService: InterventiService) { }

  ngOnInit(): void {
    this.intervento =  this.route.snapshot.data['intervento'];

    this.interventiService.findRicambi(this.intervento.id).subscribe(
      ricambi => this.ricambi = ricambi
    );
  }

}
