import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  employees: Employee[] = [];
  employeesFetched = new Subject<Employee[]>();

  constructor(private http: HttpClient) {}

  storeEmployees(employees: Employee[]) {
    this.http.put<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
      employees
    ).subscribe((response: Employee[]) => {
      this.employees = response;
      this.employeesFetched.next(this.employees.slice());
    });
  }

  fetchEmployees() {
    this.http.get<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
    ).subscribe(response => {
      if (response !== null) {
        this.employees = response;
        this.employeesFetched.next(this.employees.slice());
      }
    });

    return this.employees.slice();
  }

  addEmployee(sentEmployee: Employee) {
    this.fetchEmployees();
    this.employees.push(sentEmployee);
    this.storeEmployees(this.employees.slice());
  }
}
