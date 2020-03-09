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
  lastPageLoaded = 0 ;

  constructor(private route: ActivatedRoute,
    private interventiService: InterventiService) { }

  ngOnInit(): void {
    this.intervento =  this.route.snapshot.data['intervento'];

    this.interventiService.findRicambi(this.intervento.id, this.lastPageLoaded).subscribe(
      ricambi => this.ricambi = ricambi
    );
    
  }

  loadMore(){
    this.lastPageLoaded++;

    this.interventiService.findRicambi(this.intervento.id, this.lastPageLoaded)
    .subscribe(
      ricambi => this.ricambi = this.ricambi.concat(ricambi)
      //ricambi => this.ricambi = ricambi
    );
  }

}
