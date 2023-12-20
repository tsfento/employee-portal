import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/app/environments/environment.production';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

export interface IAuthData {
firstName: string;
lastName: string;
userId: string;
email: string;
token: string;
expiresIn: number;
}

@Injectable({
providedIn: 'root',
})
export class AuthService {
private baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
private apiKey = environment.firebaseAPIKey;
private idToken: string | null = null;
currentUser = new BehaviorSubject<User | null>(null);

constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {}

// Function to handle user sign-up
signUp(email: string, password: string, firstName?: string, lastName?: string): Observable<any> {
  const signUpData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

    // POST request to Firebase API for signing up
    return this.http.post(
      `${this.baseUrl}signUp?key=${this.apiKey}`,
      signUpData
    ).pipe(tap(response => {
      const authData: IAuthData = {
        firstName: firstName,
        lastName: lastName,
        userId: response.localId,
        email: email,
        token: response.idToken,
        expiresIn: +response.expiresIn
      };

      // Send data from response to be handled
      this.handleAuthentication(authData, false);
    }));
  }
  // Function to handle user sign-in
  signIn(email: string, password: string): Observable<any> {
    const signInData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.baseUrl}signInWithPassword?key=${this.apiKey}`, signInData)
      .pipe(
        // Store the idToken when the user signs in successfully
        tap((response: any) => {
          if (response && response.idToken) {
            this.idToken = response.idToken;
          }
          const authData: IAuthData = {
            firstName: '',
            lastName: '',
            userId: response.localId,
            email: signInData.email,
            token: response.idToken,
            expiresIn: +response.expiresIn
          }

          // Send data from response to be handled
          this.handleAuthentication(authData, true);
        }),

        // Error handling for sign-in requests
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error('Something went wrong!'));
        })
      );
  }

  // Log user out
  logout() {
    // Set authenticated user to null
    this.currentUser.next(null);
    // Route user to 'welcome' page
    this.router.navigate(['/welcome']);
    // Remove localStorage data
    localStorage.removeItem('userData');
  }

  // Function to see if user is authenticated
  isUserAuthenticated(): Observable<boolean> {
    if (this.idToken) {
      // If the token exists, check authentication status
      return this.checkUserAuthenticationStatus(this.idToken);
    } else {
      // No idToken available, user is not authenticated
      return of(false);
    }
  }

// Helper function to validate user authentication status with Firebase
private checkUserAuthenticationStatus(idToken: string): Observable<boolean> {
  const requestUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.apiKey}`;
  const requestData = { idToken: idToken };

  return this.http.post(requestUrl, requestData).pipe(
    map((response: any) => {
      // Determine user authentication status from the response
      if (response && response.users && response.users.length > 0) {
        return true; // User is authenticated
      } else {
        return false; // User is not authenticated
      }
    })
  );
}

// Handle user authentication from signup or login
  private handleAuthentication(authData: IAuthData, loggingIn: boolean) {
    // Set expiration time for authentication token (3 hours)
    const expirationDate = new Date(new Date().getTime() + authData.expiresIn * 1000);

    // Take response data from HTTP request and use it create a new User
    const loggedInUser = new User(
      '',
      '',
      authData.userId,
      authData.email,
      authData.token,
      expirationDate
    );

    // Notify currentUser subscribers of a new User
    this.currentUser.next(loggedInUser);
    // Store userData in localStorage reference
    localStorage.setItem('userData', JSON.stringify(loggedInUser));

    // If logging in, fetch User's name for display in sidebar
    // Else, store it for fetching later
    if (loggingIn) {
      this.storageService.fetchUserDetails(authData);
    } else {
      this.storageService.storeUserDetails(authData);
    }
}
}
