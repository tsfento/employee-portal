import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private storageService: StorageService) {}

  ngOnInit() {
    this.userInfoSub = this.storageService.sendUserInfo.subscribe(userInfo => {
      this.user = userInfo;
    });
  }

  ngOnDestroy() {
    this.userInfoSub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
