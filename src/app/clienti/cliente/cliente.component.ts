import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../shared/cliente.service'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(public service: ClienteService) { }

  ngOnInit(): void {
      this.service.getClienti();
  }
  
  tipiCliente = [
    {id: 1, value: 'Privato'},
    {id: 2, value: 'Azienda'},
    {id: 3, value: 'Associazione'}
  ]

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup()
  }

  onSubmit(){
    if (this.service.form.valid) {
      this.service.insertCliente(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup()
    } 

  }
}
