import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
selector: 'app-add-employee',
templateUrl: 'add-employee.component.html',
styleUrls: ['add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employees: Employee[] = [];
newEmployee = {
  name: '',
  title: '',
  email: '',
  imageUrl: '',
  reportsTo: ''
};

@Output() employeeAdded = new EventEmitter<any>();
@Output() closeForm = new EventEmitter<void>();

// Flag to see if the form is open
isAddEmployeeFormOpen = true;
onCancelForm: any;

constructor(private storageService: StorageService) {}

ngOnInit() {
this.employees = this.storageService.getAllEmployees();
}

// Method to submit the form
submitForm() {
  // Emit the new employee
  this.employeeAdded.emit(this.newEmployee);

  // Reset the form
  this.newEmployee = {
    name: '',
    title: '',
    email: '',
    imageUrl: '',
    reportsTo: ''
  };

  // Close the form
  this.closeForm.emit();
}

// Method to close the form without adding a new employee
cancelForm() {
  this.isAddEmployeeFormOpen = false;
  this.closeForm.emit();
}
}
