import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
selector: 'app-add-employee',
templateUrl: 'add-employee.component.html',
styleUrls: ['add-employee.component.css']
})
export class AddEmployeeComponent {
newEmployee = {
  name: '',
  title: '',
  email: '',
  imageUrl: ''
};

@Output() employeeAdded = new EventEmitter<any>();
@Output() closeForm = new EventEmitter<void>();

// Flag to see if the form is open
isAddEmployeeFormOpen = true;
onCancelForm: any;

// Method to submit the form
submitForm() {
  // Emit the new employee
  this.employeeAdded.emit(this.newEmployee);

  // Reset the form
  this.newEmployee = {
    name: '',
    title: '',
    email: '',
    imageUrl: ''
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
