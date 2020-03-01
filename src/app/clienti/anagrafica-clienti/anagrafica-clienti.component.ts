import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../shared/cliente.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';    //material
import { ClienteComponent } from '../cliente/cliente.component';
import { NotificationsService } from 'src/app/shared/notifications.service';

@Component({
  selector: 'app-anagrafica-clienti',
  templateUrl: './anagrafica-clienti.component.html',
  styleUrls: ['./anagrafica-clienti.component.css']
})
export class AnagraficaClientiComponent implements OnInit {

  constructor(private service: ClienteService, private dialog: MatDialog, private notification: NotificationsService) { }
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
          };
        });
        this.anagraficaClienti = new MatTableDataSource (array);
        this.anagraficaClienti.sort = this.sort;
        this.anagraficaClienti.paginator = this.paginator;
        //poichè il filter potrebbe funzionare anche se inserisco dei valori che NON sono contenuti nelle displayed columns devo LIMITARE il filtro. Si fa così (non chiaro perchè ma funziona)
        // this.anagraficaClienti.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowercase().indexof.filter() != -1;
        //   });
        // };
      }
    );
  }

  onSearchClear(){
      this.searchKey="";
      this.applyFilter();
  }

  applyFilter(){
    //trimmiamo spazi prima e dopo e riduciamo a lowercase
    this.anagraficaClienti.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //non si chiude con ESC nè cliccando fuori dalla finestra
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    this.dialog.open(ClienteComponent, dialogConfig);
  }


  onEdit(row){
    console.log (row);
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //non si chiude con ESC nè cliccando fuori dalla finestra
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    this.dialog.open(ClienteComponent, dialogConfig);
  }

  onDelete($key){
    if(confirm('Sei sicuro di cancellare questo record?')) {
      this.service.deleteCliente($key);
      this.notification.warn(">> Record Cancellato!")
    }
  }

}
