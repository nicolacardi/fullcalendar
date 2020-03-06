import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InterventoTipo } from '../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventiService {

  constructor(private db: AngularFirestore) { 
  }

  LoadAllInterventi(): Observable <InterventoTipo[]> {
    return this.db.collection('db-interventi'//, 
    //ref=>ref
    //ref=>ref.orderBy('DataIntervento')
    //.where('Operatore', '==', 'Nicola Cardi')
    //.where('Risolutivo', '==', true)
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
}
