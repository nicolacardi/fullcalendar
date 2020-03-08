import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InterventoTipo } from '../models/models';
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
        console.log(interventi);
        return interventi.length == 1 ? interventi[0]: undefined;
      }),
      first()
      )
    
  }
}
