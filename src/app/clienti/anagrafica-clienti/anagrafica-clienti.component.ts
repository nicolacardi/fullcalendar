import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';  //firestore
import { ClienteService } from '../../shared/cliente.service'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-anagrafica-clienti',
  templateUrl: './anagrafica-clienti.component.html',
  styleUrls: ['./anagrafica-clienti.component.css']
})
export class AnagraficaClientiComponent implements OnInit {

  constructor(private service: ClienteService) { }
  anagraficaClienti: MatTableDataSource<any>;
  displayedColumns: string[] = ['name'];
  ngOnInit(): void {
    this.service.getClienti().subscribe(
      list =>{
        let array = list.map(item =>{
          return {
            $key : item.payload.doc.id,
            ...item.payload.doc.data()
            //...item.payload.data();
          };
        });
        this.anagraficaClienti = new MatTableDataSource (array);
      }
    );

      // this.service.getClienti().subscribe(
      //   data => {
          
      //     let array = data;
      //     console.log (array);
      //     //a questo punto passo response a this.calendarEvents
      //   });


  }








}
