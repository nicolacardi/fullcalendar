import { Injectable } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms' //un FormControl sta dentro un FormGroup
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';  //firestore

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  listaclienti: AngularFirestoreCollection<any>;
  constructor(private afs:AngularFirestore) { }

  getClienti(){
    this.listaclienti = this.afs.collection('db-clienti');
    return this.listaclienti.snapshotChanges();
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
  }
}
