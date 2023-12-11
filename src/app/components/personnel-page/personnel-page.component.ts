import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../../employee.service';
import { take } from 'rxjs/operators';

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
  // Property to see if the Add Employee form is open
  private isOpen = false;
  isAddEmployeeFormOpen = false;

  // Inject the Renderer2 and EmployeeService
  constructor(private renderer: Renderer2, private employeeService: EmployeeService) {
    // Subscribe to the isAddEmployeeFormOpen$ observable
    this.employeeService.isAddEmployeeFormOpen$.subscribe((isOpen) => {
      this.isAddEmployeeFormOpen = isOpen;
    });
  }
 // Property to store the employee to be deleted
 private employeeToDelete: Employee | null = null;

// Method to open the offcanvas element
openOffcanvas(employee: Employee) {
  const offcanvasElement = this.offcanvas.nativeElement;
  if (!this.isOpen) {
    this.renderer.addClass(offcanvasElement, 'show');
    this.isOpen = true;
    setTimeout(() => {
      window.addEventListener('click', this.closeOffcanvasHandler);
    });
  }
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

  // Method to handle the employeeAdded event
  onEmployeeAdded(newEmployee: Employee) {
    this.employees.push(newEmployee);
    this.closeAddEmployeeForm();
  }

  // Method to close the Add Employee form
  closeAddEmployeeForm() {
    this.employeeService.closeAddEmployeeForm();
  }

  // Method to open the Edit Form
  openEditForm(event: Event, employee: Employee) {
    console.log('Opening Edit Form');
    // Stop the offCanvas from opening
    event.stopPropagation();
    this.employeeService.openEditForm(employee);
  }

  // Method to handle clicking on an employee box
  onEmployeeBoxClick(event: Event, employee: Employee) {
    console.log('Employee box clicked');
    this.openOffcanvas(employee);
  }
  preventOffCanvas(event: Event): void {
    event.stopPropagation();

  }
  // Method to confirm the deletion
  confirmDeleteEmployee() {
    if (this.employeeToDelete) {
      const index = this.employees.indexOf(this.employeeToDelete);
      if (index !== -1) {
        this.employees.splice(index, 1);
      }
      // Close the delete confirmation modal
      this.employeeService.openDeleteModal(null);
    }
  }

  // Method to show the delete confirmation modal
  confirmDeleteEmployeeModal(employee: Employee) {
    event.stopPropagation();
    this.employeeToDelete = employee;
  }

  // Method to cancel the deletion
  cancelDeleteEmployeeModal() {
    event.stopPropagation();
    this.employeeService.openDeleteModal(null);
    this.employeeToDelete = null;

  }
}
