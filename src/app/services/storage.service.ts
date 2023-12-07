import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  employees: Employee[] = [
    new Employee('Darlton Carlyle', 'Marketing Coordinator', 'dcarlyle@conglomo.com', './assets/images/Delton-Sewell-Image-1.jpg'),
  ];

  constructor(private http: HttpClient) {}

  dbTest() {
    this.http.put<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
      this.employees
    ).subscribe();
  }
}
