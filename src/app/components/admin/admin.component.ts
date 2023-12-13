import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Organization } from 'src/app/models/organization.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  company = new Organization(
    'Conglomo LLC',
    '123 Fake St.',
    'Shermer',
    'IL',
    '60062',
    '555-555-1234'
  )
  companyName = new Subject<string>();

  ngOnInit() {
    this.adminForm = new FormGroup({
      orgName: new FormControl(this.company.name, Validators.required),
      orgAddress: new FormControl(this.company.address, Validators.required),
      orgCity: new FormControl(this.company.city, Validators.required),
      orgState: new FormControl(this.company.state, Validators.required),
      orgZip: new FormControl(this.company.zip, Validators.required),
      orgPhone: new FormControl(this.company.phone, Validators.required),
    });
  }

  onSubmitForm() {
    this.company.name = this.adminForm.get('orgName').value;
    this.company.address = this.adminForm.get('orgAddress').value;
    this.company.city = this.adminForm.get('orgCity').value;
    this.company.state = this.adminForm.get('orgState').value;
    this.company.zip = this.adminForm.get('orgZip').value;
    this.company.phone = this.adminForm.get('orgPhone').value;

    this.companyName.next(this.company.name);

    this.onResetForm();
  }

  onResetForm() {
    this.adminForm.reset({
      orgName: this.company.name,
      orgAddress: this.company.address,
      orgCity: this.company.city,
      orgState: this.company.state,
      orgZip: this.company.zip,
      orgPhone: this.company.phone,
    });
  }
}
