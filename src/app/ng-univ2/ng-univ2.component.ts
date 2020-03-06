import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClienteTipo } from '../models/models';


@Component({
  selector: 'app-ng-univ2',
  templateUrl: './ng-univ2.component.html',
  styleUrls: ['./ng-univ2.component.css']
})
export class NgUniv2Component implements OnInit {

  constructor( private db: AngularFirestore) { }

  ngOnInit(): void {
    // this.db.collection('db-clienti').valueChanges() 
    //   .subscribe(val=>console.log(val));
    // valueChanges restituisce l'observable ai data() e corrisponde a:
    // db.collection('db-clienti').get()
    // .then(snaps => {
    //   console.log(snaps.docs.map(snap=> snap.data()))
    // } )
    //che si scriverebbe solo usando l'SDK
    //la differenza principale è che abbiamo una LIVE CONNECTION al database
    //valueChanges non passa metadata nè l'id.
    //valueChanges va bene per ESTRARRE SOLAMENTE dati (R), non per situazioni C(R)UD


    
    this.db.collection('db-clienti').snapshotChanges() 
      .subscribe(snaps =>{
        const clienti: ClienteTipo[] = snaps.map(snap =>{
          return <ClienteTipo>{
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as ClienteTipo
          }
        })
        console.log (clienti);
      });
    //dentro la return si può anche estrarre type
    //snap.type può avere tre valori: added, removed, modified
    //snap payload invece contiene i dati

    //questo restituisce un array con la collection intera
    // mappata a dovere, incluso l'id


    // this.db.collection('db-clienti').stateChanges()
    //   .subscribe(snaps =>{
    //     console.log(snaps);
    //   });
    //stateChanges restituisce oggetti con type + payload


  }

}
