import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Employee } from '../models/employee.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  fetchedEmployeesSub: Subscription
  topLevelEmployees: Employee[] = [];
  secondLevelEmployees: Employee[] = [];
  thirdLevelEmployees: Employee[] = [];
  fourthLevelEmployees: Employee[] = [];


  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.employees = this.storageService.fetchEmployees();

    this.fetchedEmployeesSub = this.storageService.employeesFetched.subscribe(
      fetchedEmployees => {
        this.employees = fetchedEmployees;

        this.splitEmployeesArray();
      }
    );

    this.splitEmployeesArray();
  }

  ngOnDestroy() {
    this.fetchedEmployeesSub.unsubscribe();
  }

  logEmployees() {
    console.log(this.employees);
  }

  splitEmployeesArray() {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].name === 'Robert Mack') {
        this.topLevelEmployees.push(this.employees[i]);
      }
    }
  }
}
