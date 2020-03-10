import { Component, OnInit } from '@angular/core';
import { InterventoTipo, RicambioTipo } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { InterventiService } from '../shared/interventi.service';
import { finalize } from 'rxjs/operators';

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
  loading = false;

  constructor(private route: ActivatedRoute,
    private interventiService: InterventiService) { }

  ngOnInit(): void {

    this.intervento =  this.route.snapshot.data['intervento'];
    this.loading = true;
    this.interventiService.findRicambi(this.intervento.id, this.lastPageLoaded)
    .pipe(finalize(() => this.loading = false)) //sia che si completi la richiesta che vada in errore devo essere sicuro di togliere lo spinner
    .subscribe(
      ricambi => this.ricambi = ricambi
    );
    
  }

  loadMore(){
    this.lastPageLoaded++;
    this.loading = true;
    this.interventiService.findRicambi(this.intervento.id, this.lastPageLoaded)
    .pipe(finalize(() => this.loading = false))
    .subscribe(
      ricambi => this.ricambi = this.ricambi.concat(ricambi)
      //ricambi => this.ricambi = ricambi
    );
  }

}
