import { Component } from '@angular/core';
import { AuthFacade } from '../../auth.facade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
})
export class PasswordRecoveryComponent {

  recoveryForm: FormGroup;
  isRecoveryValid: boolean;

  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder,
  ) {
    this.recoveryForm = fb.group({
      username: ['', Validators.required],
    });
    this.authFacade.isPasswordRecoveryValid$.subscribe(isValid => this.isRecoveryValid = isValid);
  }

  goToLogin(): void {
    this.authFacade.goToLogin();
  }

  recoverPassword(): void {
    this.authFacade.recoverPassword();
  }

}
