import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isSignInMode = true;
  errorMsg: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to query paramaters to determine auth mode
    this.route.queryParams.subscribe((queryParams) => {
      this.isSignInMode = queryParams['action'] === 'sign-in';
    });
  }
  onAuthSubmit(form: NgForm) {
    if (form.valid) {
      const { email, password, firstName, lastName } = form.value;
  
      if (this.isSignInMode) {
        // Sign in
        this.authService.signIn(email, password).subscribe(
          () => {
            // Handle successful sign-in. Redirect or perform other actions as needed.
            // For example, you might navigate to a dashboard or home page
            this.router.navigate(['/some-other-route']);
          },
          (error) => {
            this.errorMsg = error.message;
          }
        );
      } else {
        // Sign up
        this.authService.signUp(email, password, firstName, lastName).subscribe(
          () => {
            this.successMessage = 'Sign-up successful!';
            // Clear the form
            form.reset();
            // Perform actions after successful sign-up. Redirect or other logic as needed.
            // Example: Redirect to a welcome page or sign-in page
            this.router.navigate(['/welcome-or-signin-route']);
          },
          (error) => {
            this.errorMsg = 'Something went wrong';
          }
        );
      }
    }
  }

  
  // Function to toggle between sign-in and sign-up
  toggleAuthMode() {
    this.isSignInMode = !this.isSignInMode;
    this.errorMsg = '';
    this.successMessage='';
  }
}

