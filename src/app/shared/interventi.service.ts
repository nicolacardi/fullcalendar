import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InterventoTipo, RicambioTipo } from '../models/models';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  constructor(private db: AngularFirestore) { 
  }

  LoadAllInterventi(): Observable <InterventoTipo[]> {
    return this.db.collection('db-interventi', 
    //ref=>ref
    ref=>ref.orderBy('DataIntervento')
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


  findRicambi(interventoID: string, pageNumber = 0, pageSize = 3) : Observable<RicambioTipo[]>{
    return this.db.collection(`db-interventi/${interventoID}/ricambi`,
                ref => ref.orderBy('seqNo', 'asc')
                .limit(pageSize)
                .startAfter(pageNumber *pageSize)
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