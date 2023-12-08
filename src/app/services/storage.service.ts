import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  employees: Employee[] = [];

  constructor(private http: HttpClient) {}

  dbTest() {
    this.http.put<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
      this.employees
    ).subscribe();
  }

  storeEmployees(employees: Employee[]) {
    this.http.put<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
      employees
    ).subscribe();
  }

  fetchEmployees() {
    this.http.get<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
    ).subscribe(response => {
      if (response !== null) {
        this.employees = response;
      }
    });

    return this.employees.slice();
  }

  addEmployee(sentEmployee: Employee) {
    this.employees.push(sentEmployee);
    this.storeEmployees(this.employees.slice());
  }
}
