import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  router = inject(Router)
  isUserLogin = localStorage.getItem('login-data');
  ngOnInit(): void {
    if (this.isUserLogin !== null) {
      this.router.navigateByUrl('/home')
    }
  }
  onSubmitForm() {
    localStorage.setItem('login-data', JSON.stringify(this.loginForm.value));
    this.router.navigateByUrl('/home')
  };

}
