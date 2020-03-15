import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { InterventoTipo } from '../models/models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {InterventiService} from '../shared/interventi.service'

@Component({
  selector: 'app-assistenza',
  templateUrl: './assistenza.component.html',
  styleUrls: ['./assistenza.component.css']
})
export class AssistenzaComponent implements OnInit{

  interventi$: Observable<InterventoTipo[]>;
  interventiMeccanici: Observable<InterventoTipo[]>;
  interventiElettrici: Observable<InterventoTipo[]>;


  //constructor (private db : AngularFirestore) {}
  constructor( private interventiService: InterventiService) {}
  ngOnInit(){
     this.interventi$ = this.interventiService.LoadAllInterventi();
//     console.log (this.interventi)
// ;   


    // this.db.collection('db-interventi').snapshotChanges() 
    //   .subscribe(snaps =>{
    //     const interventi: InterventoTipo[] = snaps.map(snap =>{
    //       return <InterventoTipo>{
    //         id: snap.payload.doc.id,
    //         ...snap.payload.doc.data() as InterventoTipo
    //       }
    //     })
    //     console.log (interventi);
    //   });


    //così si estraggono e passano i dati DENTRO UN OBSERVABLE
    //...nell'html ci sarà una importantissima cosa del tipo
    //[interventi]="interventi$ | async" questa fa l'ESTRAZIONE DEI DATI DALL'OBSERVABLE
    // DIRETTAMENTE NELL'HTML!!! e l'assegnazione a [interventi]
      // this.interventi$ = this.db.collection('db-interventi').snapshotChanges() 
      //   .pipe(map(snaps => {
      //     return snaps.map(snap =>{
      //       return <InterventoTipo>{
      //         id: snap.payload.doc.id,
      //         ...snap.payload.doc.data() as InterventoTipo
      //       }
      //     });

      //   }));

        
      //console.log (this.interventi$); //la console.log mostra qualcosa di difficilmente sondabile
      //perchè mostra degli observable e non un array! Come detto è [interventi]="interventi$ | async"
      //l'istruzione chiave!



        //possiamo filtrare così:
      this.interventiMeccanici = this.interventi$.pipe(
        map(interventi => interventi.filter(
          intervento => intervento.Tipo.includes('Meccanico')))
      )
      //console.log("Interventi Meccanici");
      //console.log (this.interventiMeccanici);
      this.interventiElettrici = this.interventi$.pipe(
        map(interventi => interventi.filter(
          intervento => intervento.Tipo.includes('Elettrico')))
      )
      //console.log("Interventi Elettrici");
      //console.log (this.interventiElettrici);

  }


  
}
