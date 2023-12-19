import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

export interface IUserInfo {
  name: string;
  email: string;
  image: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  userInfoSub: Subscription;
  user: IUserInfo = { name: '', email: '', image: ''};
  companyName: string = '';
  companySub: Subscription;

  constructor(private authService: AuthService, private storageService: StorageService) {}

  ngOnInit() {
    // Subscribe to get displayName for User in user-info-box
    this.userInfoSub = this.storageService.sendUserInfo.subscribe(userInfo => {
      this.user = userInfo;
    });

    // Get Company name to display in Sidebar
    this.companyName = this.storageService.getOrganization().name;

    // Subscription to change company in sidebar
    this.companySub = this.storageService.sendCompanyDetails.subscribe(
      company => {
        this.companyName = company.name;
    });
  }

  ngOnDestroy() {
    this.userInfoSub.unsubscribe();
    this.companySub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
