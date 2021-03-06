import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../../shared/cliente.service'
import { MatTableDataSource } from '@angular/material/table'
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';    //material
import { ClienteComponent } from '../cliente/cliente.component';
import { NotificationsService } from 'src/app/shared/notifications.service';
import { ClienteTipo } from "../../models/models";
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-anagrafica-clienti',
  templateUrl: './anagrafica-clienti.component.html',
  styleUrls: ['./anagrafica-clienti.component.css']
})
export class AnagraficaClientiComponent implements OnInit {

  constructor(
    private service: ClienteService,
    private dialog: MatDialog,
    private notification: NotificationsService,
    private dialogService: DialogService ) { }

  anagraficaClienti: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'surname', 'email', 'gender', 'birthdate', 'address', 'city', 'mobile', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {

    this.service.getClienti().subscribe(
      list =>{
        let array = list.map(item =>{
          return {
            $key : item.payload.doc.id,
            ...item.payload.doc.data() as ClienteTipo
          };
        });
        
        // array.forEach(element => {
        //   console.log(element.birthdate)
        //   element.birthdate = element.birthdate.toDate();
        // });

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
     console.log(row);
     console.log (row.birthdate);


    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; //non si chiude con ESC nè cliccando fuori dalla finestra
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    this.dialog.open(ClienteComponent, dialogConfig);
  }

  onDelete($key){

      this.dialogService.openConfirmDialog('Vuoi cancellare questo cliente?')
      .afterClosed().subscribe(res => {
          if(res){
            this.service.deleteCliente($key);
            this.notification.warn(">> Record Cancellato!")
          }
      });

  }

}
