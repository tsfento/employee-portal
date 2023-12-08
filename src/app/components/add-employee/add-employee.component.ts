import { Component, EventEmitter, Output } from '@angular/core';

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

// Flag to control the visibility of the form
isAddEmployeeFormOpen = true;
onCancelForm: any;

// Function to handle form submission
submitForm() {

  // Emit the new employee data to the parent component
  this.employeeAdded.emit(this.newEmployee);

  // Reset the form or perform any other necessary actions
  this.newEmployee = {
    name: '',
    title: '',
    email: '',
    imageUrl: ''
  };

  // Close the form
  this.onCancelForm();
}

// Function to close the form without adding a new employee
cancelForm() {
  this.isAddEmployeeFormOpen = false;
  this.closeForm.emit();
}
}
