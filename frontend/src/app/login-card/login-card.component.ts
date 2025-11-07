import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { HeaderComponent } from '../header/header.component';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PasswordToggleDirective } from '../directives/password-toggle.directive';
@Component({
  selector: 'app-login-card',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HeaderComponent,
    PasswordToggleDirective
],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss',
  standalone: true,
})
export class LoginCardComponent {
  show: boolean = false;
  trueLogin: boolean = false;
  enteredUsername = '';
  enteredPassword = '';
  loginError: string | null = null;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private http: HttpClient
  ) {}

  gotoSignup() {
    this.router.navigate(['']);
  }

  onSubmit() {
  const loginData = {
    username: this.enteredUsername,
    password: this.enteredPassword,
  };

  this.loginError = null;
  this.http.post<any>('http://localhost:3000/user/login', loginData).subscribe({
    next: (res:any) => {
      const token = res.token;
      if (token) {
        sessionStorage.setItem('jwtToken', token); // Store JWT
        sessionStorage.setItem('username', loginData.username)
        this.trueLogin = true;
        console.log('Logged in', res)
        this.router.navigate(['/admin']);
      } else {
        this.loginError = 'Login failed: No token received.';
      }
    },
    error: (err:any) => {
      if (err.status === 401) {
        this.loginError = 'Invalid username or password.';
      } else if(err.status == 500) {
        this.loginError = 'Server error. Please try again later.';
      }
      else{
        this.loginError = err.error.message;
      }
      console.error('Error saving login data:', err);
    },
  });
}

}
