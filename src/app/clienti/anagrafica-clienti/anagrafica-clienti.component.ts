import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';  //firestore
import { ClienteService } from '../../shared/cliente.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-anagrafica-clienti',
  templateUrl: './anagrafica-clienti.component.html',
  styleUrls: ['./anagrafica-clienti.component.css']
})
export class AnagraficaClientiComponent implements OnInit {

  constructor(private service: ClienteService) { }
  anagraficaClienti: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'surname', 'email', 'gender', 'birthDate', 'address', 'city', 'mobile', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

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
        this.anagraficaClienti.sort = this.sort;
        this.anagraficaClienti.paginator = this.paginator;
      }
    );


      // this.service.getClienti().subscribe(
      //   data => {
      //     let array = data;
      //     console.log (array);
      //   });

  }

  onSearchClear(){
      this.searchKey="";
      this.applyFilter();
  }

  applyFilter(){
    //trimmiamo spazi prima e dopo e riduciamo a lowercase
    this.anagraficaClienti.filter = this.searchKey.trim().toLowerCase();
  }








}
