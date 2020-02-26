import { Component, OnInit } from '@angular/core';
import { EmployeeeService } from 'src/app/shared/employeee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeeService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form!=null)
    form.resetForm();
    this.service.formData= {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile:''
    }
  }
}
