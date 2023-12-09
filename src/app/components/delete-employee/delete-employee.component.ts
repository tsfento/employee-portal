// delete-employee.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-employee',
  templateUrl: 'delete-employee.component.html',
  styleUrls: ['delete-employee.component.css']
})
export class DeleteEmployeeComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() deleteEmployee = new EventEmitter<void>();

  closeModal() {
    this.cancel.emit();
  }

  deleteTask() {
    this.deleteEmployee.emit();
  }
}


