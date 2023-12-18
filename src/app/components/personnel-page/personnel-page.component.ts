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

  // Constructor to inject the EmployeeService
  constructor(private employeeService: EmployeeService, private storageService: StorageService) {
    this.employeeService.isAddEmployeeFormOpen$.subscribe((isOpen) => {
      this.isAddEmployeeFormOpen = isOpen;
    });
  }


  ngOnInit() {
    // Subscribe to the employees$ observable
    this.employeeService.employees$.subscribe(employees => {
        this.employees = employees;
    });

    // Fetch the employees from the storage service
    const initialEmployees = this.storageService.fetchEmployees();
    this.employeeService.setEmployees(initialEmployees);

    // Subscribe to the employeesFetched event
    this.employeesFetchedSub = this.storageService.employeesFetched.subscribe(
        (fetchedEmployees: Employee[]) => {
            this.employees = fetchedEmployees;
            this.employeeService.setEmployees(fetchedEmployees);
        }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the employeesFetched event
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
    if (this.employeeToDelete) {
      const index = this.employees.indexOf(this.employeeToDelete);
      if (index !== -1) {
        this.employees.splice(index, 1);
      }
      this.storageService.deleteEmployee(index);
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

  // Method to add a new item to the todo list
  addItem(todoRef:HTMLInputElement){
    const ul = document.querySelector(".todo-list");
    const li = document.createElement("li");
    li.setAttribute("class", "to-do-item");
    li.innerText=todoRef.value;
    ul.appendChild(li);
    todoRef.value='';
  }

  // Method to add a new item to the event list
  addItemEvent(eventRef: HTMLInputElement) {
    const ul = document.querySelector(".event-list");
    const li = document.createElement("li");
    li.setAttribute("class", "event-item");
    li.innerText = eventRef.value;
    ul.appendChild(li);
    eventRef.value = '';
  }

  // Method to add a new item to the task list
  addItemTask(taskRef: HTMLInputElement) {
    const ul = document.querySelector(".task-list");
    const li = document.createElement("li");
    li.setAttribute("class", "task-item");
    li.innerText = taskRef.value;
    ul.appendChild(li);
    taskRef.value = '';
  }

  // Method to add a new item to the news list
  addItemNews(newsRef: HTMLInputElement) {
    const ul = document.querySelector(".news-list");
    const li = document.createElement("li");
    li.setAttribute("class", "news-item");
    li.innerText = newsRef.value;
    ul.appendChild(li);
    newsRef.value = '';
  }

  // Method to add a new item to the document list
  addItemDocument(docRef: HTMLInputElement) {
    const ul = document.querySelector(".document-list");
    const li = document.createElement("li");
    li.setAttribute("class", "document-item");
    li.innerText = docRef.value;
    ul.appendChild(li);
    docRef.value = '';
  }

  // Method to add a new item to the training list
  addItemTraining(trainingRef: HTMLInputElement) {
    const ul = document.querySelector(".training-list");
    const li = document.createElement("li");
    li.setAttribute("class", "training-item");
    li.innerText = trainingRef.value;
    ul.appendChild(li);
    trainingRef.value = '';
  }
}
