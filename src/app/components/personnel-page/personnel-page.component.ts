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
  offCanvasEmployee = new Employee('', '', '', '', '', [], [], [], [], [], []);
  offCanvasEmployeeIndex: number;
  deleteListItemIcon: string = `&nbsp;<span class="delete-list-item material-symbols-outlined" (click)="deleteListItem(offCanvasEmployee.todos, j)">
  delete_forever
  </span>`
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
  onEmployeeBoxClick(event: Event, employee: Employee, index: number) {
    this.offCanvasEmployee = new Employee(
      employee.name,
      employee.title,
      employee.email,
      employee.imageUrl,
      employee.reportsTo,
      employee.todos,
      employee.events,
      employee.tasks,
      employee.news,
      employee.docs,
      employee.training
    );
    this.offCanvasEmployeeIndex = index;
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

  email() {
    // Prevent offcanvas from opening when clicking email
    event.stopPropagation();
  }

  // Method to cancel the deletion
  cancelDeleteEmployeeModal() {
    event.stopPropagation();
    this.employeeService.openDeleteModal(null);
    this.employeeToDelete = null;

  }

  // Method to add a new item to the todo list
  addItem(todoRef: HTMLInputElement){
    // Old way involved directly appending to unordered list
    const ul = document.querySelector(".todo-list");
    const li = document.createElement("li");
    li.setAttribute("class", "to-do-item");

    if (todoRef.value !== '') {
      li.innerText = todoRef.value;
      // ul.appendChild(li);

      // New way adds to array on employee and uses ngFor
      if (this.offCanvasEmployee.todos === undefined) {
        this.offCanvasEmployee.todos = [];
      }
      this.offCanvasEmployee.todos.push(todoRef.value);
      this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
    }

    todoRef.value='';
  }

  // Method to add a new item to the event list
  addItemEvent(eventRef: HTMLInputElement) {
    // Old way involved directly appending to unordered list
    const ul = document.querySelector(".event-list");
    const li = document.createElement("li");
    li.setAttribute("class", "event-item");

    if (eventRef.value !== '') {
      li.innerText = eventRef.value;
      // ul.appendChild(li);

      // New way adds to array on employee and uses ngFor
      if (this.offCanvasEmployee.events === undefined) {
        this.offCanvasEmployee.events = [];
      }
      this.offCanvasEmployee.events.push(eventRef.value);
      this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
    }

    eventRef.value = '';
  }

  // Method to add a new item to the task list
  addItemTask(taskRef: HTMLInputElement) {
    // Old way involved directly appending to unordered list
    const ul = document.querySelector(".task-list");
    const li = document.createElement("li");
    li.setAttribute("class", "task-item");

    if (taskRef.value !== '') {
      li.innerText = taskRef.value;
      // ul.appendChild(li);

      // New way adds to array on employee and uses ngFor
      if (this.offCanvasEmployee.tasks === undefined) {
        this.offCanvasEmployee.tasks = [];
      }
      this.offCanvasEmployee.tasks.push(taskRef.value);
      this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
    }

    taskRef.value = '';
  }

  // Method to add a new item to the news list
  addItemNews(newsRef: HTMLInputElement) {
    // Old way involved directly appending to unordered list
    const ul = document.querySelector(".news-list");
    const li = document.createElement("li");
    li.setAttribute("class", "news-item");

    if (newsRef.value !== '') {
      li.innerText = newsRef.value;
      // ul.appendChild(li);

      // New way adds to array on employee and uses ngFor
      if (this.offCanvasEmployee.news === undefined) {
        this.offCanvasEmployee.news = [];
      }
      this.offCanvasEmployee.news.push(newsRef.value);
      this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
    }

    newsRef.value = '';
  }

  // Method to add a new item to the document list
  addItemDocument(docRef: HTMLInputElement) {
    // Old way involved directly appending to unordered list
    const ul = document.querySelector(".document-list");
    let li = document.createElement("li");
    li.setAttribute("class", "document-item");

    if (docRef.value !== '') {
      li.innerText = docRef.value;
      // ul.appendChild(li);

      // New way adds to array on employee and uses ngFor
      if (this.offCanvasEmployee.docs === undefined) {
        this.offCanvasEmployee.docs = [];
      }

      this.offCanvasEmployee.docs.push(docRef.value);
      this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
    }

    docRef.value = '';
  }

  // Method to add a new item to the training list
  addItemTraining(trainingRef: HTMLInputElement) {
    // Old way involved directly appending to unordered list
    const ul = document.querySelector(".training-list");
    const li = document.createElement("li");
    li.setAttribute("class", "training-item");

    if (trainingRef.value !== '') {
      li.innerText = trainingRef.value;
      // ul.appendChild(li);

      // New way adds to array on employee and uses ngFor
      if (this.offCanvasEmployee.training === undefined) {
        this.offCanvasEmployee.training = [];
      }
      this.offCanvasEmployee.training.push(trainingRef.value);
      this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
    }

    trainingRef.value = '';
  }

  deleteListItem(array: any[], arrayIndex: number) {
    array.splice(arrayIndex, 1);
    this.storageService.editEmployee(this.offCanvasEmployee, this.offCanvasEmployeeIndex);
  }
}
