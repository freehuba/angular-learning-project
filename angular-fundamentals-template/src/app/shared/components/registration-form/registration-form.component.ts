import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { CoursesService } from '@app/services/courses.service';
import { EmailValidatorDirective } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private courseService: CoursesService,private authService: AuthService) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name : ['', Validators.required],
      email: ['', [Validators.required,new EmailValidatorDirective().validate]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for form controls
  get f() {
    return this.registrationForm.controls;
  }


  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe((response) => {
        this.router.navigate(['/login']); 
        alert('User successfully Registred!');
      });
    } else {
      console.log('Form is invalid');
    }
    this.registrationForm.reset();
  }
}
