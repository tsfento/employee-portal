import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-personnel-page',
  templateUrl: 'personnel-page.component.html',
  styleUrls: ['personnel-page.component.css']
})
export class PersonnelPageComponent {
  employees = [
    { name: 'Darlton Carlyle', title: 'Marketing Coordinator', email: 'dcarlyle@conglomo.com', imageUrl: './assets/images/Delton-Sewell-Image-1.jpg' }
  ];

  // Reference to the off-canvas element in the HTML
  @ViewChild('offcanvas') offcanvas!: ElementRef;

  private clickListener: () => void;
  private isOpen = false;

  constructor(private renderer: Renderer2) {}

  // Function to add a new employee to the employees array
  addEmployee() {
    this.employees.push({
      name: 'New Employee',
      title: 'New Position',
      email: 'newemail@conglomo.com',
      imageUrl: 'path-to-image.jpg'
    });
  }
 // Function to open the off-canvas panel when an employee box is clicked
  openOffcanvas(employee: any) {
    const offcanvasElement = this.offcanvas.nativeElement;
    this.renderer.addClass(offcanvasElement, 'show');
    this.isOpen = true;

    // Add a delay to registering the click event listener
    setTimeout(() => {
      this.clickListener = this.renderer.listen('document', 'click', (event: Event) => {
        if (this.isOpen && !offcanvasElement.contains(event.target)) {
          this.closeOffcanvas();
        }
      });
    });

    // Show the off-canvas container
    const offcanvasContainer = document.querySelector('.offcanvas-container');
    if (offcanvasContainer) {
      this.renderer.addClass(offcanvasContainer, 'show');
    }
  }
  // Function to close the off-canvas panel
  closeOffcanvas() {
    const offcanvasElement = this.offcanvas.nativeElement;
    this.renderer.removeClass(offcanvasElement, 'show');
    this.isOpen = false;

    // Remove the click event listener
    if (this.clickListener) {
      this.clickListener();
    }

    // Hide the off-canvas container
    const offcanvasContainer = document.querySelector('.offcanvas-container');
    if (offcanvasContainer) {
      this.renderer.removeClass(offcanvasContainer, 'show');
    }
  }
}
