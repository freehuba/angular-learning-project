import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  registrationForm: FormGroup;

  constructor(private router: Router, private courseService: CoursesService, private authService: AuthService) {
    // Initialize the registrationForm using FormGroup and FormControl directly
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, new EmailValidatorDirective().validate]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe((response) => {
        this.router.navigate(['/login']); 
        alert('User successfully registered!');
      });
    } else {
      console.log('Form is invalid');
    }
    this.registrationForm.reset();
  }
}
