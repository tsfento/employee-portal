// personnel-page.component.ts
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-personnel-page',
  templateUrl: 'personnel-page.component.html',
  styleUrls: ['personnel-page.component.css']
})
export class PersonnelPageComponent implements OnInit, OnDestroy {
  employees: Employee[] = [
    // { name: 'Darlton Carlyle', title: 'Marketing Coordinator', email: 'dcarlyle@conglomo.com', imageUrl: './assets/images/Delton-Sewell-Image-1.jpg' }
  ];
  employeesFetchedSub: Subscription;

  @ViewChild('offcanvas') offcanvas!: ElementRef;
  // Property to see if the Add Employee form is open
  private isOpen = false;
  isAddEmployeeFormOpen = false;

  constructor(private renderer: Renderer2, private storageService: StorageService) {}

  ngOnInit() {
    this.employees = this.storageService.fetchEmployees();

    this.employeesFetchedSub = this.storageService.employeesFetched.subscribe(
      (fetchedEmployees: Employee[]) => {
        this.employees = fetchedEmployees;
      }
    );
  }

  ngOnDestroy() {
    this.employeesFetchedSub.unsubscribe();
  }

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

  closeOffcanvasHandler = (event: Event) => {
    const offcanvasElement = this.offcanvas.nativeElement;

    if (this.isOpen && !offcanvasElement.contains(event.target as Node)) {
      this.closeOffcanvas();
      window.removeEventListener('click', this.closeOffcanvasHandler);
    }
  };

  closeOffcanvas() {
    const offcanvasElement = this.offcanvas.nativeElement;
    this.renderer.removeClass(offcanvasElement, 'show');
    this.isOpen = false;

    setTimeout(() => {
      window.removeEventListener('click', this.closeOffcanvasHandler);
    }, 300);
  }

  openAddEmployeeForm() {
    console.log('Opening Add Employee Form');
    this.employeeService.openAddEmployeeForm();
  }

  // Method to handle the employeeAdded event
  onEmployeeAdded(newEmployee: Employee) {
    this.storageService.addEmployee(newEmployee);
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
