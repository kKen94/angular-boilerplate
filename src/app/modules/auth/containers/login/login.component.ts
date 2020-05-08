import { Component } from '@angular/core';
import { AuthFacade } from '../../auth.facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ce-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
