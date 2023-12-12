// personnel-page.component.ts
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
@Component({
  selector: 'app-personnel-page',
  templateUrl: 'personnel-page.component.html',
  styleUrls: ['personnel-page.component.css']
})
export class PersonnelPageComponent {
   document = inject(DOCUMENT);
  employees: Employee[] = [
    { name: 'Darlton Carlyle', title: 'Marketing Coordinator', email: 'dcarlyle@conglomo.com', imageUrl: './assets/images/Delton-Sewell-Image-1.jpg' }
  ];

  @ViewChild('offcanvas') offcanvas!: ElementRef;
  private isOpen = false;

  // Correct property name
  isAddEmployeeFormOpen = false;

  constructor(private renderer: Renderer2) {}

  openOffcanvas(employee: Employee) {
    const offcanvasElement = this.offcanvas.nativeElement;

    if (!this.isOpen) {
      this.renderer.addClass(offcanvasElement, 'show');
      this.isOpen = true;

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
    this.employees.push(newEmployee);
    this.closeAddEmployeeForm();
  }

  addtolist(listid: string, addedcontent: string){
    var list=document.getElementById(listid);
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(addedcontent));
    list.appendChild(li);
  }
}

