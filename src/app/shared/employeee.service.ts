import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeeService {
  formData: Employee; //di tipo Employee, tipo che abbiamo importato

  constructor() { }
}
