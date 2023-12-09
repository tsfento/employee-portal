import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './components/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  // Properties to see if the Add Employee form is open
  private isAddEmployeeFormOpenSubject = new BehaviorSubject<boolean>(false);
  isAddEmployeeFormOpen$: Observable<boolean> = this.isAddEmployeeFormOpenSubject.asObservable();

  // Add the selectedEmployeeSubject property
  private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$: Observable<Employee | null> = this.selectedEmployeeSubject.asObservable();

  // Add the isEditEmployeeFormOpenSubject property
  isEditEmployeeFormOpen = new BehaviorSubject<boolean>(false);
  isEditEmployeeFormOpen$: Observable<boolean> = this.isEditEmployeeFormOpen.asObservable();

  constructor() {}

  // Method to open the Add Employee form
  openAddEmployeeForm() {
    this.isAddEmployeeFormOpenSubject.next(true);
  }

  // Method to close the Add Employee form
  closeAddEmployeeForm() {
    this.isAddEmployeeFormOpenSubject.next(false);
  }

  // Method to open the Edit Employee form
  openEditForm(employee: Employee) {
    console.log('Opening Edit Form');
    this.selectedEmployeeSubject.next(employee);
    this.isEditEmployeeFormOpen.next(true);
  }

  closeEditForm() {
    console.log('Closing Edit Form');
    this.selectedEmployeeSubject.next(null);
    this.isEditEmployeeFormOpen.next(false);
  }

  // Method to update the employee
  updateEmployee(updatedEmployee: Employee) {
    const currentEmployees = this.employeesSubject.getValue();
    const index = currentEmployees.findIndex((e) => e.email === updatedEmployee.email);

    if (index !== -1) {
      currentEmployees[index] = updatedEmployee;
      this.employeesSubject.next([...currentEmployees]);
    }

    // Reset the form and edit mode
    this.closeEditForm();
  }
}
