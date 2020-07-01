import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '../../auth.facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isFormValid: boolean;

  constructor(private authFacade: AuthFacade, private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.authFacade.isLoginValid$.subscribe(
      isValid => (this.isFormValid = isValid),
    );
  }

  login(): void {
    this.authFacade.login();
  }

  goToPasswordRecovery(): void {
    this.authFacade.goToPasswordRecovery();
  }

  goToSignUp(): void {
    this.authFacade.goToSignUp();
  }
}
