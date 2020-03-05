//USO DELL'SDK FIREBASE****************************
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app'    //firebase SDK
import 'firebase/firestore';                //si importa la parte firestore dell'SDK
import { ClienteTipo } from '../models/models';

const config = {
  apiKey: "AIzaSyCANsbPVvSPmFOKgapordcWCa63VCU2feE",
  authDomain: "myfirebase-83554.firebaseapp.com",
  databaseURL: "https://myfirebase-83554.firebaseio.com",
  projectId: "myfirebase-83554",
  storageBucket: "myfirebase-83554.appspot.com",
  messagingSenderId: "411638616069",
  appId: "1:411638616069:web:e10a0cbb1ffe59d21e8c6c",
  measurementId: "G-QDCRH2TG1B"
};

//passiamo la configurazione all'oggetto firebase
firebase.initializeApp(config);

//creiamo una reference all'oggetto firestore
const db = firebase.firestore(); //con questo possiamo già fare una query nel db

//servono altri settings oltre ai config
// const settings = { timestampsInSnapshots:true }; //ha a che fare con il modo in cui firestore gestisce le date
//questo potrebbe essere RISOLTO IN FUTURO (da vedere ora se serve)
// db.settings(settings); 
//infatti è stato sistemato e non serve: per default è true oggi


@Component({
  selector: 'app-ng-univ',
  templateUrl: './ng-univ.component.html',
  styleUrls: ['./ng-univ.component.css']
})
export class NgUnivComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    //così facciamo la get di UN SINGOLO DOCUMENTO
    // db.doc('db-clienti/6CC1llNwWE8JtygDQqIC')
    //  .get()
    //  .then(snap => console.log(snap.data()));

    //  db.collection('db-clienti')
    //  .get()
    //  .then(snap => console.log(snap.docs[0]));
    
    
    //l'API dell'SDK è promise based e non Observable based
    // con Angular fire si passa a un Observable based API!!!!!!!!!!
    //data restituisce I DATI non l'id
    //se c'è una nested collection NON VIENE RESTITUITA COSI: la nested collection non viene considerata parte di un documento



    //possiamo anche fare una query a una INTERA COLLECTION!
    db.collection('db-clienti').get()
      .then(snaps => {
        const clienti : ClienteTipo [] = snaps.docs.map(snap=> {
          return <ClienteTipo>{
            id: snap.id,
            ...snap.data()
          }
        });
        console.log(clienti);
      });
    ;

    
    //Anche in questo caso la get è una promise quindi serve una istruzione then
    //restituisce una lista di snapshot, ciascuna corrispondente a un documento della collection
  }

}
