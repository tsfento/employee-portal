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
  openOffcanvas(event: Event, employee: any) {
    const offcanvasElement = this.offcanvas.nativeElement;

    if (!this.isOpen) {
      this.renderer.addClass(offcanvasElement, 'show');
      this.isOpen = true;

      // Global click event listener to close the off-canvas when clicking outside
      setTimeout(() => {
        window.addEventListener('click', this.closeOffcanvasHandler);
      });
    }
  }

    // Event handler for closing the off-canvas panel
  closeOffcanvasHandler = (event: Event) => {
    const offcanvasElement = this.offcanvas.nativeElement;

    if (this.isOpen && !offcanvasElement.contains(event.target as Node)) {
      this.closeOffcanvas();
      window.removeEventListener('click', this.closeOffcanvasHandler);
    }
  };
  // Function to close the off-canvas panel.
  closeOffcanvas() {
    const offcanvasElement = this.offcanvas.nativeElement;
    this.renderer.removeClass(offcanvasElement, 'show');
    this.isOpen = false;

    // Delay removal of the event listener to allow for smooth transitions
    setTimeout(() => {
      window.removeEventListener('click', this.closeOffcanvasHandler);
    }, 300);
  }
}
