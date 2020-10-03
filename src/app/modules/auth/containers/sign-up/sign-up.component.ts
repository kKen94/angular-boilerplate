import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equalTo } from '@validator';
import { AuthFacade } from '../../auth.facade.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isFormValid!: boolean;

  constructor(private facade: AuthFacade, private fb: FormBuilder) {
    this.signUpForm = fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyName: ['', Validators.required],
      fullname: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signUpForm.addControl(
      'confirmPassword',
      this.fb.control('', [
        Validators.required,
        equalTo(this.signUpForm.controls['password']),
      ]),
    );
    this.facade.isSignUpValid$.subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  signUp(): void {
    this.facade.signUp();
  }

  goToLogin(): void {
    this.facade.goToLogin();
  }
}
