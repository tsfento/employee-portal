import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';

const EXAMPLE_PAYROLL_DATA = [
  { employee: 'Cherilyn Baxter', role: 'Brand Strategist', salary: 70000, payPeriod: 'Bi-Weekly', totalPaid: 2800 },
  { employee: 'Justin Jones', role: 'Marketing Lead', salary: 65000, payPeriod: 'Bi-Weekly', totalPaid: 2500 },
];

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
  newEmployeeData = { name: '', role: '', salary: 0, payPeriod: '', totalPaid: 0 };
  payrollEntries: any[] = EXAMPLE_PAYROLL_DATA;

  ngAfterViewInit() {
    Chart.register(ChartDataLabels);
    this.createPieChart();
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

  // Method to create the pie chart
  createPieChart() {
    const context = this.pieChart.nativeElement.getContext('2d');

    // Define the chart configuration
    const chartConfig: any = {
      type: 'pie',
      data: {
        labels: ['Worked Hours', 'Vacation Leave', 'Paid Time Off'],
        datasets: [{
          data: [10, 20, 30],
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 100,
          }
        },
        plugins: {
          title: {
            display: true,
            text: '                       Employee Time Allocation',
            font: {
              size: 18
            },
            padding: {
            }
          },
          subtitle: {
            display: true,
            text: '                              Distribution of Time Types',
            font: {
              size: 14
            },
            padding: {
              bottom: 30

            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed + ' hrs';
                }
                return label;
              }
            }
          },
          legend: {
            display: true,
            position: 'right',
          }
        },
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label + '\n' + value + '%';
          },
          color: '#333333',
          anchor: 'end',
          align: 'start',
          font: {
            size: 12
          },
          offset: 5
        }
      }
    };

    this.pieChart.nativeElement.width = 800;
  this.pieChart.nativeElement.height = 800;

    // Create the chart with the configuration
    new Chart(context, chartConfig);
  }

   // Method to add a new employee to the payroll summary
   addEmployee() {
    this.payrollEntries.push({ ...this.newEmployeeData });
    this.clearNewEmployeeData(); // Clear the form fields
  }

  // Method to clear the new employee data form
  clearNewEmployeeData() {
    this.newEmployeeData = { name: '', role: '', salary: 0, payPeriod: '', totalPaid: 0 };
  }

  updatePayroll() {
    // Create a new entry based on the form data
    const newEntry = {
      employee: this.newEmployeeData.name,
      role: this.newEmployeeData.role,
      salary: this.newEmployeeData.salary,
      payPeriod: this.newEmployeeData.payPeriod,
      totalPaid: this.newEmployeeData.totalPaid,
    };

    // Add the new entry to the payrollEntries array
    this.payrollEntries.push(newEntry);

  }

  // Method to calculate the total container height
  calculatePayrollContainerHeight(): string {
    const numRows = this.payrollEntries.length;
    const rowHeight = 50;
    const minHeight = 300;
    const calculatedHeight = minHeight + numRows * rowHeight + 'px';
    return calculatedHeight;
  }

  // Method to delete an entry from the payrollEntries array
  deleteEntry(index: number) {
    if (index >= 0 && index < this.payrollEntries.length) {
      this.payrollEntries.splice(index, 1);
    }
  }
}
