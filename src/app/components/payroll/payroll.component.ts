import { Component } from '@angular/core';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {
  hourlyRate: number;
  hoursWorked: number;
  totalPay: number;

  // Method to calculate the total pay
  calculatePay() {
    this.totalPay = this.hourlyRate * this.hoursWorked;
  }
  clearCalculator() {
    this.hourlyRate = null;
    this.hoursWorked = null;
    this.totalPay = null;
  }
}
