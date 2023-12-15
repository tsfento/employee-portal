import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-personnel-page',
  templateUrl: 'personnel-page.component.html',
  styleUrls: ['personnel-page.component.css']
})
export class PersonnelPageComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  employeesFetchedSub: Subscription;

  @ViewChild('offcanvas') offcanvas!: ElementRef;
  isAddEmployeeFormOpen = false;
  private employeeToDelete: Employee | null = null;

  constructor(private employeeService: EmployeeService, private storageService: StorageService) {
    this.employeeService.isAddEmployeeFormOpen$.subscribe((isOpen) => {
      this.isAddEmployeeFormOpen = isOpen;
    });
  }

  ngOnInit() {
    this.employeeService.employees$.subscribe(employees => {
        this.employees = employees;
    });

    const initialEmployees = this.storageService.fetchEmployees();
    this.employeeService.setEmployees(initialEmployees);

    this.employeesFetchedSub = this.storageService.employeesFetched.subscribe(
        (fetchedEmployees: Employee[]) => {
            this.employees = fetchedEmployees;
            this.employeeService.setEmployees(fetchedEmployees);
        }
    );
  }

  ngOnDestroy() {
    this.employeesFetchedSub.unsubscribe();
  }

  // Method to open the offcanvas element
  openOffcanvas(employee: Employee) {
    const offcanvasElement = this.offcanvas.nativeElement;
    const bsOffcanvas = new Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  }

  // Method to close the offcanvas element
  closeOffcanvas() {
    const offcanvasElement = this.offcanvas.nativeElement;
    const bsOffcanvas = new Offcanvas(offcanvasElement);
    bsOffcanvas.hide();
  }
  // Method to open the Add Employee form
  openAddEmployeeForm() {
    this.employeeService.openAddEmployeeForm();
  }

  // Method to handle the employeeAdded event
  onEmployeeAdded(newEmployee: Employee) {
    // this.employees.push(newEmployee);
    this.storageService.addEmployee(newEmployee);
    this.closeAddEmployeeForm();
  }

  // Method to close the Add Employee form
  closeAddEmployeeForm() {
    this.employeeService.closeAddEmployeeForm();
  }

  // Method to open the Edit Form
  openEditForm(event: Event, employee: Employee, index: number) {
    console.log('Opening Edit Form');
    // Stop the offCanvas from opening
    event.stopPropagation();
    this.employeeService.openEditForm(employee, index);
  }

  // Method to handle clicking on an employee box
  onEmployeeBoxClick(event: Event, employee: Employee) {
    this.openOffcanvas(employee);
  }
  preventOffCanvas(event: Event): void {
    event.stopPropagation();

  }
  // Method to confirm the deletion
  confirmDeleteEmployee() {
    console.log('Deletion process started');
    event.stopPropagation();
    if (this.employeeToDelete) {
      const index = this.employees.indexOf(this.employeeToDelete);
      console.log('Employee found for deletion');
      if (index !== -1) {
        this.employees.splice(index, 1);
      }
      this.storageService.deleteEmployee(index);
      // Close the delete confirmation modal
      this.employeeService.openDeleteModal(null);
      console.log('Employee deleted')
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
