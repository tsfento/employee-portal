import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Employee } from 'src/app/models/employee.model';
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
        this.splitTopLevelEmployees();
      },
    );
  }

  ngOnDestroy() {
    this.fetchedEmployeesSub.unsubscribe();
  }

  logEmployees() {
    console.log(this.employees);
  }

  splitTopLevelEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].reportsTo === 'na') {
        this.topLevelEmployees.push(this.employees[i]);
      }
    }

    this.splitSecondLevelEmployees();
  }

  splitSecondLevelEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      for (let j = 0; j < this.topLevelEmployees.length; j++) {
        if (this.employees[i].reportsTo === this.topLevelEmployees[j].name) {
          this.secondLevelEmployees.push(this.employees[i]);
        }
      }
    }

    this.splitThirdLevelEmployees();
  }

  splitThirdLevelEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      for (let j = 0; j < this.secondLevelEmployees.length; j++) {
        if (this.employees[i].reportsTo === this.secondLevelEmployees[j].name) {
          this.thirdLevelEmployees.push(this.employees[i]);
        }
      }
    }

    this.splitFourthLevelEmployees();
  }

  splitFourthLevelEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      for (let j = 0; j < this.thirdLevelEmployees.length; j++) {
        if (this.employees[i].reportsTo === this.thirdLevelEmployees[j].name) {
          this.fourthLevelEmployees.push(this.employees[i]);
        }
      }
    }
  }
}
