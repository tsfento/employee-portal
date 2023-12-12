import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent {
  searchQuery: string = '';

  constructor(private employeeService: EmployeeService) {}

  // Method to search for employees
  searchEmployees() {
    this.employeeService.filterEmployees(this.searchQuery);
}
 // Method called on input change
 onSearchInput() {
  if (this.searchQuery === '') {
    this.resetSearch();
  }
}

// Reset search and show all employees
resetSearch() {
  this.employeeService.resetEmployeeFilter();
}


}
