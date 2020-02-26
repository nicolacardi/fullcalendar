import { Component } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'; //questo è il service di firestore da injectare nel constructor
import { Observable } from 'rxjs';

@Component({
  selector: 'app-assistenza',
  templateUrl: './assistenza.component.html',
  styleUrls: ['./assistenza.component.css']
})
export class AssistenzaComponent {
  employees: Observable<any[]>; //employees è di tipo Observable per cui sarà async nell'html
  constructor( private afs: AngularFirestore) { 
    this.employees =  this.afs.collection('employees').valueChanges()
  }

  addEmployee(){
    var employee={
      firstname: prompt('Enter First Name')
    }
    this.afs.collection('employees').add(employee)
  }

  
}
