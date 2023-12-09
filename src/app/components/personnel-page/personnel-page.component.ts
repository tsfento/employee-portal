import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../../employee.service';
import { take } from 'rxjs/operators';

import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
selector: 'app-personnel-page',
templateUrl: 'personnel-page.component.html',
styleUrls: ['personnel-page.component.css']
})
export class PersonnelPageComponent {
// Array of employees
employees: Employee[] = [
  { name: 'Darlton Carlyle', title: 'Marketing Coordinator', email: 'dcarlyle@conglomo.com', imageUrl: './assets/images/Delton-Sewell-Image-1.jpg' }
];

// Add the ViewChild decorator
@ViewChild('offcanvas') offcanvas!: ElementRef;
private isOpen = false;

// Property to see if the Add Employee form is open
isAddEmployeeFormOpen = false;

// Inject the Renderer2 and EmployeeService
constructor(private renderer: Renderer2, private employeeService: EmployeeService) {

  // Subscribe to the isAddEmployeeFormOpen$ observable
  this.employeeService.isAddEmployeeFormOpen$.subscribe((isOpen) => {
    this.isAddEmployeeFormOpen = isOpen;
  });
}
// Method to open the offcanvas element
openOffcanvas(employee: Employee) {
  // Subscribe to the isEditEmployeeFormOpen$ observable
  this.employeeService.isEditEmployeeFormOpen$.pipe(take(1)).subscribe((isEditEmployeeFormOpen) => {
    // Only open the offcanvas if the edit form is not open
    if (!isEditEmployeeFormOpen && !this.isAddEmployeeFormOpen) {
      const offcanvasElement = this.offcanvas.nativeElement;
      // Make sure the offcanvas element is not already open
      if (!this.isOpen) {
        this.renderer.addClass(offcanvasElement, 'show');
        this.isOpen = true;
        // Set up a click event listener to close the offcanvas
        setTimeout(() => {
          window.addEventListener('click', this.closeOffcanvasHandler);
        });
      }
    }
  });
}
// Method to close the offcanvas element
closeOffcanvasHandler = (event: Event) => {
  const offcanvasElement = this.offcanvas.nativeElement;
  // Check if the click event is outside the offcanvas element
  if (this.isOpen && !offcanvasElement.contains(event.target as Node)) {
    this.closeOffcanvas();
  }
};
// Method to close the offcanvas element
closeOffcanvas() {
  const offcanvasElement = this.offcanvas.nativeElement;
  this.renderer.removeClass(offcanvasElement, 'show');
  this.isOpen = false;
  // Remove the event listener after the offcanvas is closed
  setTimeout(() => {
    window.removeEventListener('click', this.closeOffcanvasHandler);
  }, 300);
}

// Method to open the Add Employee form
openAddEmployeeForm() {
  console.log('Opening Add Employee Form');
  this.employeeService.openAddEmployeeForm();
}
// Method for when an employee is added
onEmployeeAdded(newEmployee: Employee) {
  this.employees.push(newEmployee);
  this.closeAddEmployeeForm();
}

// Method to close the Add Employee form
closeAddEmployeeForm() {
  this.employeeService.closeAddEmployeeForm();
}

// Method to handle icon click for editing
openEditForm(employee: Employee) {
  this.employeeService.openEditForm(employee);
}
showDeleteModal = false;

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  performDeleteAction() {
  
    console.log('Employee deleted!');
    this.showDeleteModal = false;
  }
}
