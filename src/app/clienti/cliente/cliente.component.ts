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
