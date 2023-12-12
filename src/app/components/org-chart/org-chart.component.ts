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

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.employees = this.storageService.fetchEmployees();

    this.fetchedEmployeesSub = this.storageService.employeesFetched.subscribe(
      fetchedEmployees => {
        this.employees = fetchedEmployees;
      }
    );
  }

  ngOnDestroy() {
    this.fetchedEmployeesSub.unsubscribe();
  }

  logEmployees() {
    console.log(this.employees);
  }
}
