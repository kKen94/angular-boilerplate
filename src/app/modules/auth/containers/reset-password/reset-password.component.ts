import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { equalTo } from '@validator';
import { AuthFacade } from '../../auth.facade.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isFormValid: boolean;

  constructor(private authFacade: AuthFacade, private fb: FormBuilder) {
    this.resetPasswordForm = fb.group({
      newPassword: ['', Validators.required],
    });
    this.resetPasswordForm.addControl(
      'confirmPassword',
      this.fb.control('', [
        Validators.required,
        equalTo(this.resetPasswordForm.controls['newPassword']),
      ]),
    );
    this.authFacade.isResetPasswordValid$.subscribe(isValid => (this.isFormValid = isValid));
  }

  goToLogin(): void {
    this.authFacade.goToLogin();
  }

  resetPassword(): void {
    this.authFacade.resetPassword();
  }
}
