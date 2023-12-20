import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Subject } from "rxjs";
import { IAuthData } from "../components/auth/auth.service";
import { environment } from "../environments/environment.production";
import { IUserInfo } from "../components/sidebar/sidebar.component";
import { Organization } from "../models/organization.model";

const API_KEY = environment.firebaseAPIKey;
const UPDATE_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
const LOOKUP_USER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

// Interface for ResponseData when updating a user's data using Firebase API docs
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

// Interface for ResponseData when fetching a user's data using Firebase API docs
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
  // Default data for fake Company in app
  company = new Organization(
    'Conglomo LLC',
    '123 Fake St.',
    'Shermer',
    'IL',
    '60062',
    '555-555-1234'
  );
  sendCompanyDetails = new Subject<Organization>();

  constructor(private http: HttpClient) {}

  // Store user details alongside account on Firebase for retrieval later
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

  // Fetch user details from Firebase for display in sidebar and authentication
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
    // Sort employees array alphabetically by last name
    const sortedEmployees = employees.sort((a, b) => a.name.split(' ')[1].localeCompare(b.name.split(' ')[1]));

    // Store employees array on Firebase Realtime Database
    this.http.put<Employee[]>(
      `https://employee-portal-f13b1-default-rtdb.firebaseio.com/employees.json`,
      sortedEmployees
    ).subscribe((response: Employee[]) => {
      this.employees = response;
      this.employeesFetched.next(this.employees.slice());
    });
  }

  // Fetch employees array from Firebase Realtime Database
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

  // Add an employee to the employees array on Firebase
  addEmployee(sentEmployee: Employee) {
    this.fetchEmployees();
    this.employees.push(sentEmployee);
    this.storeEmployees(this.employees.slice());
  }

  // Edit an existing employee and store the change on Firebase
  editEmployee(employeeToEdit: Employee, editIndex: number) {
    this.employees[editIndex] = employeeToEdit;
    this.storeEmployees(this.employees.slice());
  }

  // Remove an employee and update the Firebase storage
  deleteEmployee(deleteIndex: number) {
    this.employees.splice(deleteIndex, 1);
    this.storeEmployees(this.employees.slice());
  }

  // Method to get all employees
  getAllEmployees(): Employee[] {
    return this.employees.slice();
  }

  // Set company name for display in sidebar
  setOrganization(org: Organization) {
    this.company = org;
    this.sendCompanyDetails.next(this.company);
  }

  // Return company name for display in sidebar
  getOrganization() {
    return this.company;
  }
}
