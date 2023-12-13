import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart: ElementRef<HTMLCanvasElement>;
  hourlyRate: number;
  hoursWorked: number;
  totalPay: number;

  ngAfterViewInit() {
    this.createPieChart();
  }

  createPieChart() {
    const context = this.pieChart.nativeElement.getContext('2d');
    new Chart(context, {
      type: 'pie',
      data: {
        labels: ['UPTO', 'Vacation', 'PTO'],
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['red', 'blue', 'green'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Pie Chart Title',
            font: {
              size: 16
            }
          },
          subtitle: {
            display: true,
            text: 'Pie Chart Subtitle',
            font: {
              size: 14
            }
          },
          tooltip: {
            enabled: false,
          },
          legend: {
            display: true,
            position: 'right',
          }
        },

        // @ts-ignore Come back to. Need to know how to fix this.
        datalabels: {
          formatter: (value, context) => {
            const dataset = context.chart.data.datasets[0];
            if (dataset) {
              const total = dataset.data.reduce((acc, dataValue) => acc + dataValue, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${dataset.label}: ${percentage}%`;
            }
            return '';
          },
          color: 'white',
          anchor: 'center',
          align: 'center',
          font: {
            size: 14
          }
        }
      }
    });
  }

  // Method to calculate the total pay
  calculatePay() {
    this.totalPay = this.hourlyRate * this.hoursWorked;
  }

  // Method to clear the calculator
  clearCalculator() {
    this.hourlyRate = null;
    this.hoursWorked = null;
    this.totalPay = null;
  }
}
