import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs'
import { InterventoTipo } from '../models/models';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {

  }

  launchBatch(){
    const  firebaseIntervento1Ref =
      this.db.doc('/db-interventi/D6UUigz7ApTgDTjQ09BY').ref;

    const  firebaseIntervento2Ref =
      this.db.doc('/db-interventi/LcAHKxSGBkIpGmiLN2rX').ref;

    const batch = this.db.firestore.batch();

    batch.update(firebaseIntervento1Ref ,{Modello: 'Porsche Cayman ddd'});
    batch.update(firebaseIntervento2Ref ,{Modello: 'Peugeot 3008 4x4'});
    //batch.commit(); //questo restituirebbe una promise
    const batch$ = of(batch.commit()); //of...restituisce un observable a cui si può fare la subscribe
    batch$.subscribe(); //a cosa serve? fa lo stesso l'update...forse a ciò che segue
    //se c'è un problema a una delle due update tutte e due verranno rolled back!
    //fino a 500 operazioni sono consentite in una singola batch, se se ne fanno di più allora vanno divise in due batch

    //In a nutshell, the main differences between a Promise and an Observable are as follows: a Promise is eager, whereas an Observable is lazy, a Promise is always asynchronous, while an Observable can be either synchronous or asynchronous, ... you can apply RxJS operators to an Observable to get a new tailored stream.
    //We could also say that the main difference between a promise and an observable is that a promise emits only a single value, whereas an observable emits multiple values. ... With a promise, on the other hand, the calling code also request a single value, but it doesn't block until the value is returned.
  }

  async runTransaction(){
    const addX = await this.db.firestore.runTransaction(async transaction=> {
      //la async keyword IMPLICITAMENTE ritorna una PROMISE e ci consente di usare la sintassi async...await
      console.log('Running transaction...');
      const interventoRef = this.db.doc('/db-interventi/D6UUigz7ApTgDTjQ09BY').ref;
      //(await interventoRef.get()).data() //restituirebbe i dati ma senza un record lock
      const snap = await transaction.get(interventoRef); //questo ritorna una promise a un record che è temporaneamente Locked
      const intervento = <InterventoTipo> snap.data();
      const NIntervento =  intervento.NIntervento + "x";
      transaction.update(interventoRef, {NIntervento});
      return NIntervento;
    });
    console.log ("aggiunta una x");
  }


}
