import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms' //un FormControl sta dentro un FormGroup
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';  //firestore

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private afs:AngularFirestore) { }

  listaclienti: AngularFirestoreCollection<any>;



  getClienti(){
    this.listaclienti = this.afs.collection('db-clienti');
    return this.listaclienti.snapshotChanges();
  }

  insertCliente(cliente){
    this.listaclienti.add({
      name: cliente.name,
      surname: cliente.surname,
      email: cliente.email,
      gender: cliente.gender,
      birthdate: cliente.birthdate,
      type: cliente.type,
      address: cliente.address,
      city: cliente.city,
      mobile: cliente.mobile,
      fattElettronica: cliente.fattElettronica
    })
  }

  updateCliente(cliente){
    this.listaclienti.doc(cliente.$key).update(
      {
      name: cliente.name,
      surname: cliente.surname,
      email: cliente.email,
      gender: cliente.gender,
      birthdate: cliente.birthdate,
      type: cliente.type,
      address: cliente.address,
      city: cliente.city,
      mobile: cliente.mobile,
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
    email: new FormControl('', Validators.email),
    gender: new FormControl(1),
    birthdate: new FormControl (''),
    type: new FormControl(0), //se privato / azienda /associazione ecc
    address: new FormControl(''),
    city: new FormControl(''),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    fattElettronica: new FormControl('false')
  });

  initializeFormGroup() {
    this.form.setValue({
    $key: null,
    name: '',
    surname: '',
    email: '',
    gender: 1,
    birthdate: '',
    type: 0,
    address: '',
    city: '',
    mobile: '',
    fattElettronica: false
    });
  }


}
