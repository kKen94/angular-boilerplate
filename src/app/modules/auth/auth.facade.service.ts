import { Injectable, OnInit } from '@angular/core';
import { AuthApi } from './api';
import { Login, Logout, RecoverPassword } from './state/auth/auth.actions';
import { Actions, ofActionDispatched, ofActionSuccessful, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { AUTH_STATE_TOKEN } from './state/auth/auth.state';
import {
  SetFormDirty,
  SetFormPristine,
  UpdateForm,
  UpdateFormDirty,
  UpdateFormStatus,
  UpdateFormValue
} from '@ngxs/form-plugin';

@Injectable()
export class AuthFacade {

  constructor(
    private authApi: AuthApi,
    private store: Store,
    private actions: Actions,
  ) {
    this.actions.pipe(ofActionSuccessful(Login)).subscribe(() => {
      this.resetForm('auth.loginForm');
      this.goToCallbackUrl();
    });
    this.actions.pipe(ofActionSuccessful(RecoverPassword)).subscribe(() => {
      this.resetForm('auth.recoveryForm');
      this.goToLogin();
    });
    this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => this.goToLogin());
  }

  login(): void {
    this.store.dispatch(new Login());
  }

  recoverPassword(): void {
    this.store.dispatch(new RecoverPassword());
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
