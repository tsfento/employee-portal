import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { StorageService } from 'src/app/services/storage.service';

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
  employees: Employee[] = [];
  employee: Employee;
  isEditEmployeeFormOpen: boolean = false;
  editIndex: number;

  constructor(private employeeService: EmployeeService, private storageService: StorageService) {}

  ngOnInit() {
    this.employees = this.storageService.getAllEmployees();
    // Subscribe to the selectedEmployee$ observable
    this.employeeService.selectedEmployee$.subscribe(([selectedEmployee, index]) => {
      this.selectedEmployee = selectedEmployee;
      this.editIndex = index;
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
    this.storageService.editEmployee(this.selectedEmployee, this.editIndex);
    this.closeForm.emit();
  }
  // Method to cancel the form
  cancelForm() {
    console.log('Submit and Cancel');
    this.closeForm.emit();
  }
}
