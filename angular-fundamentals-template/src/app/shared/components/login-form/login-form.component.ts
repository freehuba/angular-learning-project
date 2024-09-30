import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  emailError: string | null = null;
  passwordError: string | null = null; 
  @Output() loggedIn: EventEmitter<string> = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onRegister(): void {
    this.router.navigate(['/registration']); 
  }

  resetErrors(): void {
    this.emailError = null; 
    this.passwordError = null; 
  }

  resetEmailError(): void {
    this.emailError = null;
  }

  resetPasswordError(): void {
    this.passwordError = null;
  }
  
  onSubmit(): void {
    this.resetErrors();
  
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login({ email, password }).subscribe(
        (username: string | undefined) => {
          this.loggedIn.emit(username);
          this.router.navigate(['/courses']); 
          this.loginForm.reset();
        },
        (error: any) => {
          // Handle errors here
          this.emailError = 'Invalid email';
          this.passwordError = 'Invalid password';
        }
      );
    } else {
      // Display specific error messages for form validation
      if (this.f['email'].errors?.['required'] && this.f['email'].touched) {
        this.emailError = 'Email is required.';
      } else if (this.f['email'].errors?.['email'] && this.f['email'].touched) {
        this.emailError = 'Email is not valid.';
      }

      if (this.f['password'].errors?.['required'] && this.f['password'].touched) {
        this.passwordError = 'Password is required.';
      }
    }
  }  
}
