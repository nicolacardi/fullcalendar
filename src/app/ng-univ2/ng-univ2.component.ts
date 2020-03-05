import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


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
      .subscribe(val=>console.log(val));


      //molto bene, eccomi qua
  }

}
