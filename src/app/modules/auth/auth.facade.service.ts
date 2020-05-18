import { Injectable } from '@angular/core';
import {
  SetFormPristine,
  UpdateFormStatus,
  UpdateFormValue,
} from '@ngxs/form-plugin';
import { Navigate } from '@ngxs/router-plugin';
import {
  Actions,
  ofActionCompleted,
  ofActionSuccessful,
  Select,
  Store,
} from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  ChangePassword,
  Login,
  Logout,
  RecoverPassword,
  ResetPassword,
  SignUp,
} from './state/auth.action';
import { AuthState, AUTH_STATE_TOKEN } from './state/auth.state';

@Injectable()
export class AuthFacade {
  @Select(AuthState.loginFormValidation) isLoginValid$: Observable<boolean>;
  @Select(AuthState.signUpFormValidation) isSignUpValid$: Observable<boolean>;
  @Select(AuthState.passwordRecoveryFormValidation)
  isPasswordRecoveryValid$: Observable<boolean>;
  @Select(AuthState.changePasswordFormValidation)
  isChangePasswordValid$: Observable<boolean>;
  @Select(AuthState.resetPasswordFormValidation)
  isResetPasswordValid$: Observable<boolean>;

  constructor(private store: Store, private actions: Actions) {
    this.actions.pipe(ofActionSuccessful(Login)).subscribe(() => {
      this.resetForm('auth.loginForm');
      this.goToCallbackUrl();
    });
    this.actions.pipe(ofActionSuccessful(RecoverPassword)).subscribe(() => {
      this.resetForm('auth.recoveryForm');
      this.goToLogin();
    });
    this.actions.pipe(ofActionSuccessful(ChangePassword)).subscribe(() => {
      this.resetForm('auth.changePasswordForm');
      this.goToLogin();
    });
    this.actions.pipe(ofActionSuccessful(ResetPassword)).subscribe(() => {
      this.resetForm('auth.resetPasswordForm');
      this.goToLogin();
    });
    this.actions.pipe(ofActionSuccessful(SignUp)).subscribe(() => {
      this.resetForm('auth.signUpForm');
      console.log('do something');
    });
    this.actions
      .pipe(ofActionCompleted(Logout))
      .subscribe(() => this.goToLogin());
  }

  login(): void {
    this.store.dispatch(new Login());
  }

  recoverPassword(): void {
    this.store.dispatch(new RecoverPassword());
  }

  changePassword(): void {
    this.store.dispatch(new ChangePassword());
  }

  resetPassword(): void {
    this.store.dispatch(new ResetPassword());
  }

  signUp(): void {
    this.store.dispatch(new SignUp());
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }

  /********************** NAVIGATION ************************/

  goToLogin(): void {
    this.store.dispatch(new Navigate(['/auth/login']));
  }

  goToSignUp(): void {
    this.store.dispatch(new Navigate(['/auth/sign-up']));
  }

  goToPasswordRecovery(): void {
    this.store.dispatch(new Navigate(['/auth/password-recovery']));
  }

  private goToCallbackUrl(): void {
    const callbackUrl = this.store.selectSnapshot(AUTH_STATE_TOKEN).callbackUrl;
    this.store.dispatch(new Navigate([callbackUrl]));
  }

  /********************* PRIVATE *****************************/

  private resetForm(path: string): void {
    this.store.dispatch(new SetFormPristine(path));
    this.store.dispatch(new UpdateFormStatus({ status: '', path }));
    this.store.dispatch(new UpdateFormValue({ value: undefined, path }));
  }
}
