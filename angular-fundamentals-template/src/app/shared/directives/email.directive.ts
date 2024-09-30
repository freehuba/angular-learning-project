import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: EmailValidatorDirective, 
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const valid = emailRegEx.test(control.value);
    return valid ? null : { invalidEmail: true };
  }
}
