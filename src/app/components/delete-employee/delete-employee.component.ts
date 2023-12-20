import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() employeeToDelete: Employee | null = null;
  @Output() confirmDelete: EventEmitter<Employee | null> = new EventEmitter<Employee | null>();
  @Output() cancelDelete: EventEmitter<void> = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    // Subscribe to changes in the deleteModalData$ observable from the EmployeeService
    this.employeeService.deleteModalData$.subscribe((employee) => {
      this.employeeToDelete = employee;
    });
  }

  // Method to handle cofirmation of deleting an employee
  confirm() {
    this.confirmDelete.emit(this.employeeToDelete);
  }

  // Method to handle cancellation of deleting an employee
  cancel() {
    this.cancelDelete.emit();
  }
}
