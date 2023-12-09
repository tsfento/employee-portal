import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: 'edit-employee.component.html',
  styleUrls: ['edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() selectedEmployee: Employee;
  @Output() employeeUpdated = new EventEmitter<Employee>();
  @Output() closeForm = new EventEmitter<void>();

  // Local property to hold the employee
  employee: Employee;
  isEditEmployeeFormOpen: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    // Subscribe to the selectedEmployee$ observable
    this.employeeService.selectedEmployee$.subscribe((selectedEmployee) => {
      this.selectedEmployee = selectedEmployee;
      // Set the flag to see if the form is open
      this.isEditEmployeeFormOpen = !!selectedEmployee;
      // If there is a selected employee, copy it to the local property
      if (this.selectedEmployee) {
        this.employee = { ...this.selectedEmployee };
      }
    });
  }
  // Method to prevent the off-canvas from closing when clicking inside the form
  preventOffCanvas(event: Event): void {
    console.log('Preventing off-canvas');
    event.stopPropagation();
  }
  // Method to submit the form
  submitForm() {
    console.log('Submit and Cancel');
    this.employeeUpdated.emit(this.employee);
    this.closeForm.emit();
  }
  // Method to cancel the form
  cancelForm() {
    console.log('Submit and Cancel');
    this.closeForm.emit();
  }
}
