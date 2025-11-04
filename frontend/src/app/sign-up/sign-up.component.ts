import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { signUpData } from './signup-data.model';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  imports: [HeaderComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  constructor(private router:Router, private httpclient: HttpClient){}
    goHome(){
      this.router.navigate(['/'])
    }

    signUpInfo: signUpData = {
    enteredUsername: '',
    entered_full_Name: '',
    enteredEmail: '',
    enteredPhoneNumber: '',
    enteredPass: '',
    enteredRole: ''
  };

    onSubmit(){
      this.httpclient.post('http://localhost:3000/user/register', this.signUpInfo).subscribe({
        next : res=>{
          console.log('SignUp completed', res)
          this.goHome();
        },
        error: err=>{
        console.log('Registration failed', err)
        }
      })
    }
}
