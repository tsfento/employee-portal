import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Organization } from 'src/app/models/organization.model';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  company: Organization;

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.company = this.storageService.getOrganization();

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

    this.storageService.setOrganization(this.company);

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
