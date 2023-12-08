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
  private isOpen = false;

  // Correct property name
  isAddEmployeeFormOpen = false;

  constructor(private renderer: Renderer2, private storageService: StorageService) {}

  ngOnInit() {
    this.employees = this.storageService.fetchEmployees();

    this.employeesFetchedSub = this.storageService.employeesFetched.subscribe(
      fetchedEmployees => {
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
    this.isAddEmployeeFormOpen = true;
  }

  closeAddEmployeeForm() {
    this.isAddEmployeeFormOpen = false;
  }

  onEmployeeAdded(newEmployee: Employee) {
    this.storageService.addEmployee(newEmployee);
    this.closeAddEmployeeForm();
  }
}
