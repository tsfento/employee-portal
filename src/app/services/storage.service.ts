import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Subject } from "rxjs";
import { IAuthData } from "../components/auth/auth.service";
import { environment } from "../environments/environment.production";
import { IUserInfo } from "../components/sidebar/sidebar.component";

const API_KEY = environment.firebaseAPIKey;
const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const LOOKUP_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

interface IStoreUserResponseData {
  localId: string;
  email: string;
  displayName: string;
  photoUrl: string;
  passwordHash: string;
  providerUserInfo: any;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

interface IFetchUserResponseData {
  kind: string;
  users: [{
    localId: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    providerUserInfo: any;
    photoUrl: string;
    passwordHash: string;
    passwordUpdatedAt: number;
    validSince: string;
    disabled: boolean;
    lastLoginAt: string;
    createdAt: string;
    customAuth: boolean;
  }];
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  employees: Employee[] = [];
  employeesFetched = new Subject<Employee[]>();
  userInfo: IUserInfo;
  sendUserInfo = new Subject<{ name: string, email: string, image: string }>();



  constructor(private http: HttpClient) {}

  storeUserDetails(authData: IAuthData) {
    this.http.post(
      UPDATE_USER_URL,
      {
        'idToken': authData.token,
        'displayName': `${authData.firstName} ${authData.lastName}`,
        'photoUrl': '',
        'returnSecureToken': true

      }
    ).subscribe((res: IStoreUserResponseData) => {
      this.userInfo = {
        name: res.displayName,
        email: res.email,
        image: './assets/images/blank-profile-picture_640.png'
      };

      this.sendUserInfo.next(this.userInfo);
    });
  }

  fetchUserDetails(authData: IAuthData) {
    this.http.post(
      LOOKUP_USER_URL,
      {
        'idToken': authData.token
      }
    ).subscribe((res: IFetchUserResponseData) => {
      this.userInfo = {
        name: res.users[0].displayName,
        email: res.users[0].email,
        image: './assets/images/blank-profile-picture_640.png'
      };

      this.sendUserInfo.next(this.userInfo);
    });
  }

  storeEmployees(employees: Employee[]) {
    this.http.put<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
      employees
    ).subscribe((response: Employee[]) => {
      this.employees = response;
      this.employeesFetched.next(this.employees.slice());
    });
  }

  fetchEmployees() {
    this.http.get<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
    ).subscribe(response => {
      if (response !== null) {
        this.employees = response;
        this.employeesFetched.next(this.employees.slice());
      }
    });

    return this.employees.slice();
  }

  addEmployee(sentEmployee: Employee) {
    this.fetchEmployees();
    this.employees.push(sentEmployee);
    this.storeEmployees(this.employees.slice());
  }

  editEmployee(employeeToEdit: Employee, editIndex: number) {
  }

  deleteEmployee(deleteIndex: number) {
    this.employees.splice(deleteIndex, 1);
    this.storeEmployees(this.employees.slice());
  }
   // Method to get all employees
   getAllEmployees(): Employee[] {
    return this.employees;
  }
}
