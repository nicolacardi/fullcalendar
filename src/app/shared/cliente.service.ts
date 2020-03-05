import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms' //un FormControl sta dentro un FormGroup
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';  //firestore
import { map } from 'rxjs/operators'  
import { ClienteTipo } from '../models/models'               //interface ClienteTipo

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  listaclienti: AngularFirestoreCollection<any>;
  
  constructor(private afs:AngularFirestore) { }

  getClienti(){

    this.listaclienti = this.afs.collection('db-clienti' , ref => ref.orderBy('surname'));
    return this.listaclienti.snapshotChanges();

    // return this.listaclienti.snapshotChanges()
    // .pipe(map(
    //   changes => {
    //   return changes.map(
    //   a => {
    //   const data = a.payload.doc.data() as ClienteTipo;
    //   return data;
    //   });
    // }))
    // .subscribe(
    //   data => {
    //     //poichè ci sono dei campi timestamp li devo convertire in Date
    //     data.forEach(element => {
    //       element.birthdate = element.birthdate.toDate();
    //     });
    //     //this.calendarEvents = data
    //   });
  }

  insertCliente(cliente){
    this.listaclienti.add({
      name: cliente.name,
      surname: cliente.surname,
      email: cliente.email,
      birthdate: cliente.birthdate,
      address: cliente.address,
      city: cliente.city,
      mobile: cliente.mobile,
      gender: cliente.gender,
      fattElettronica: cliente.fattElettronica
    })
  }

  updateCliente(cliente){
    this.listaclienti.doc(cliente.$key).update(
      {
      name: cliente.name,
      surname: cliente.surname,
      email: cliente.email,
      birthdate: cliente.birthdate,
      address: cliente.address,
      city: cliente.city,
      mobile: cliente.mobile,
      gender: cliente.gender,
      fattElettronica: cliente.fattElettronica
    });
  }

  deleteCliente($key: string){
    this.listaclienti.doc($key).delete();
  }

  //definiamo la variabile $key che sarà l'identifier di ogni elemento
  //in arrivo dalla collection clienti
  //usiamo un reactive form collegato a questo service con i FormControlName
  //quindi qui impostiamo anche le regole di validazione via Validators
  form: FormGroup = new FormGroup({
    $key: new FormControl(null), //valore di default null
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    birthdate: new FormControl (''),
    address: new FormControl(''),
    city: new FormControl(''),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', Validators.email),
    gender: new FormControl('M'),
    fattElettronica: new FormControl('false')
  });

  initializeFormGroup() {
    this.form.setValue({
    $key: null,
    name: '',
    surname: '',
    birthdate: '',
    address: '',
    city: '',
    mobile: '',
    email: '',
    gender: 'M',
    fattElettronica: false
    });
  }

  populateForm(cliente){


    this.form.setValue(cliente);
    //siccome la setValue passa l'intero oggetto, si tratta di passare al form POI la data riformattata
    //altrimenti viene null in quanto è un timestamp. Ho provato di tutto per fare diversamente....
    //questo workaround sembra l'unico accettato
    if (cliente.birthdate != '') {this.form.controls['birthdate'].setValue(cliente.birthdate.toDate())};

  }
}
