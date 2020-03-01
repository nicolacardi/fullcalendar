import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../shared/cliente.service'
import { NotificationsService } from '../../shared/notifications.service'
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(public service: ClienteService, public notification: NotificationsService,
  public dialogRef: MatDialogRef<ClienteComponent>) { }

  ngOnInit(): void {
      this.service.getClienti();
  }
  
  tipiCliente = [
    {id: 1, value: 'Contatto Telefonico'},
    {id: 2, value: 'Richiesta da Web'},
    {id: 3, value: 'Segnalazione da amico'},
    {id: 4, value: 'Adesione a promo del 1/1/2018'},
    {id: 5, value: 'Adesione a promo del 1/1/2019'},
    {id: 6, value: 'Adesione a promo del 1/1/2020'}
  ]

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup()
  }

  onSubmit(){
    if (this.service.form.valid) {
      if(!this.service.form.get('$key').value){
        this.service.insertCliente(this.service.form.value);
      } else { 
        this.service.updateCliente(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup()
    } 
    this.notification.success('>> Record Inserito!');
    this.onCloseDialog();
  }

  onCloseDialog(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
