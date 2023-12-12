import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../components/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // BehaviorSubject to store the data for the delete modal
  private deleteModalData = new BehaviorSubject<Employee | null>(null);
  deleteModalData$: Observable<Employee | null> = this.deleteModalData.asObservable();

  private originalEmployees: Employee[] = [];

  // BehaviorSubject to store the employees
  private employeesSubject = new BehaviorSubject<Employee[]>([

  ]);
  employees$: Observable<Employee[]> = this.employeesSubject.asObservable();

  // BehaviorSubject to track if the add employee form is open
  private isAddEmployeeFormOpenSubject = new
  BehaviorSubject<boolean>(false);
  isAddEmployeeFormOpen$: Observable<boolean> = this.isAddEmployeeFormOpenSubject.asObservable();

  // BehaviorSubject to track the employee selected for editing
  private selectedEmployeeSubject = new BehaviorSubject<Employee | null>(null);
  selectedEmployee$: Observable<Employee | null> = this.selectedEmployeeSubject.asObservable();

  // BehaviorSubject to track if the edit employee form is open
  isEditEmployeeFormOpen = new BehaviorSubject<boolean>(false);
  isEditEmployeeFormOpen$: Observable<boolean> = this.isEditEmployeeFormOpen.asObservable();

  constructor() {}

  // Method to reset the employees to the original list
  resetEmployeeFilter() {
    this.employeesSubject.next([...this.originalEmployees]);
  }


  // Method to open the add employee form
  openAddEmployeeForm() {
    this.isAddEmployeeFormOpenSubject.next(true);
  }

  // Method to close the add employee form
  closeAddEmployeeForm() {
    this.isAddEmployeeFormOpenSubject.next(false);
  }

  // Method to open the edit employee form
  openEditForm(employee: Employee) {
    this.selectedEmployeeSubject.next(employee);
    this.isEditEmployeeFormOpen.next(true);
  }
  // Method to close the edit employee form
  closeEditForm() {
    this.selectedEmployeeSubject.next(null);
    this.isEditEmployeeFormOpen.next(false);
  }

  // Method to update the employee information
  updateEmployee(updatedEmployee: Employee) {
    const currentEmployees = this.employeesSubject.getValue();
    const index = currentEmployees.findIndex((e) => e.email === updatedEmployee.email);

    if (index !== -1) {
      currentEmployees[index] = updatedEmployee;
      this.employeesSubject.next([...currentEmployees]);
    }
    this.closeEditForm();
  }

  // Method to open the delete modal
  openDeleteModal(employee: Employee | null) {
    this.deleteModalData.next(employee);
  }

  // Method to filter the employees
  filterEmployees(query: string): void {
    const allEmployees = this.employeesSubject.getValue();

    if (!query.trim()) {
      // Reset the list to show all employees if the query is empty
      this.employeesSubject.next(allEmployees);
      return;
    }

    const filteredEmployees = allEmployees.filter(employee =>
      employee.name.toLowerCase().includes(query.toLowerCase()) ||
      employee.title.toLowerCase().includes(query.toLowerCase()) ||
      employee.email.toLowerCase().includes(query.toLowerCase())
    );

    this.employeesSubject.next(filteredEmployees);
  }

  // Method to set
  setEmployees(employees: Employee[]) {
    this.employeesSubject.next(employees);
}

}
