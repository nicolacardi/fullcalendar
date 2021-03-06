import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { InterventoTipo, RicambioTipo } from '../models/models';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  constructor(private db: AngularFirestore) { 
  }

  saveIntervento(interventoID: string, changes: Partial<InterventoTipo>) : Observable<any> {
    //il Partial è necessario se desideriamo passare anche una parte dei campi e non tutti
    console.log("Service saveIntervento");
    console.log(changes);
    //non compila nemmeno se dove chiamiamo la funzione passiamo solo alcuni campi
    return from (this.db.doc(`db-interventi/${interventoID}`).update(changes));
    //il metodo update restituisce una promise come normalmente nell'sdk
    //bisogna convertire la promise in un Observable: si usa il metodo from di rxjs
    //e' molto simile all'angular http observable

    //this.db.doc(`db-interventi/${interventoID}`).ha vari metodi (esplorare)
    //scegliamo update e non set. Set se non c'è il record lo crea, mentre update non lo fa

  }

  LoadAllInterventi(): Observable <InterventoTipo[]> {
    //---------------------------------------------------
    //AS: chiamata standard a REST api:
    //---------------------------------------------------
    /*
    //Nel Service:   (Importante: è uno "stateless observable based service", cioè non contiene dati nè definizione dell'oggetto)
    //(l'istruzione map converte l'oggetto restituito dal servizio REST in un oggetto di tipo InterventoTipo)
    loadAllInterventi(){
      return this.http.get <InterventoTipo[]>("/api/interventi")
        .pipe(
          map(res => res["nome_oggetto_REST"] )
        );
    }
    //Nel component (il simbolo $ sta a indicare che la variabile è un observable, non è obbligatorio):
    objInterventi$: Observable<InterventoTipo[]>;
    ngOnInit(){
      this.objInterventi$ = this.interventiService.LoadAllInterventi();
    }
    //Nell'html: 
    <mat-card *ngFor="let intervento of (objInterventi$ | async) ">
    */
    //---------------------------------------------------
    
    return this.db.collection('db-interventi', 
    //ref=>ref
    ref=>ref.orderBy('dtIntervento')
    //.where('Operatore', '==', 'Nicola Cardi')
    //.where('Risolutivo', '==', true)
    //se c'è un campo array e voglio estrarre gli array
    //che contengono un certo valore
    //.where('campoarray', 'array-contains', 'valore da cercare')
    )
    .snapshotChanges() 
      .pipe(
        map(snaps => {
          return snaps.map(snap =>{
          return <InterventoTipo>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as InterventoTipo
          }
        });
      }));
  }

  findNIntervento(NIntervento): Observable<InterventoTipo>{
    return this.db.collection('db-interventi',
        ref => ref.where('NIntervento',"==", NIntervento)
      )
      .snapshotChanges()
      .pipe(
        map(snaps=> {
          const interventi = snaps.map(snap =>{
          return <InterventoTipo>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as InterventoTipo
          }
        });
        //console.log(interventi);
        return interventi.length == 1 ? interventi[0]: undefined;
        //la riga qui sopra serve nel caso in cui venissero ritornati
        //per assurdo più record: in quel caso voglio undefined
        //altrimenti voglio il primo
      }),
      //L'observable viene trasmesso solo quando completo
      //quindi devo "fermarlo" altrimenti resta "live" 
      first()
      )
    
  }


  findRicambi(interventoID: string, pageNumber: number, pageSize = 3) : Observable<RicambioTipo[]>{
    //console.log(pageNumber)
    return this.db.collection(`db-interventi/${interventoID}/ricambi`,
                ref => ref.orderBy('seqNo')
                .startAfter(pageNumber * pageSize) //non funziona bene: anche 
                .limit(pageSize)
                )
      .snapshotChanges()
      .pipe(map(snaps=>{
        return snaps.map(snap =>{
        return <RicambioTipo>{
          id: snap.payload.doc.id,
          ...snap.payload.doc.data() as RicambioTipo
          }
        });
      }),
      first()
      )
  }





}