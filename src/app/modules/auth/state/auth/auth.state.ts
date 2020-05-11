import { Injectable } from '@angular/core';
import { FormState } from '@model';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthApi } from '../../api';
import {
  ChangePasswordDto,
  ChangePasswordForm,
  LoginDto,
  PasswordRecoveryForm,
  ResetPasswordForm,
} from '../../models';
import { ChangePassword, Login, Logout, RecoverPassword, ResetPassword } from './auth.actions';

/******************************** STATE MODEL ********************************/

interface AuthStateModel {
  token: string | null;
  callbackUrl: string;
  recoveryForm: FormState<PasswordRecoveryForm>;
  loginForm: FormState<LoginDto>;
  changePasswordForm: FormState<ChangePasswordForm>;
  resetPasswordForm: FormState<ResetPasswordForm>;
}

class AuthStateModel {
  constructor() {
    this.token = null;
    this.callbackUrl = '/';
    this.recoveryForm = new FormState();
    this.loginForm = new FormState();
    this.changePasswordForm = new FormState();
    this.resetPasswordForm = new FormState();
  }
}

/******************************** STATE DECLARATION *************************/

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth');

@State({
  name: AUTH_STATE_TOKEN,
  defaults: new AuthStateModel(),
})
/****************************** COMPONENT ***********************************/

@Injectable()
export class AuthState {
  @Selector([AUTH_STATE_TOKEN])
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector([AUTH_STATE_TOKEN])
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector([AUTH_STATE_TOKEN])
  static callbackUrl(state: AuthStateModel): string {
    return state.callbackUrl;
  }

  @Selector([AUTH_STATE_TOKEN])
  static loginFormValidation(state: AuthStateModel) {
    return state.loginForm.status === 'VALID';
  }

  @Selector([AUTH_STATE_TOKEN])
  static passwordRecoveryFormValidation(state: AuthStateModel) {
    return state.recoveryForm.status === 'VALID';
  }

  @Selector([AUTH_STATE_TOKEN])
  static changePasswordFormValidation(state: AuthStateModel) {
    return state.changePasswordForm.status === 'VALID';
  }

  @Selector([AUTH_STATE_TOKEN])
  static resetPasswordFormValidation(state: AuthStateModel) {
    return state.resetPasswordForm.status === 'VALID';
  }

  constructor(private authApi: AuthApi) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>): Observable<{ token: string }> {
    const loginValue = ctx.getState().loginForm.model;
    return this.authApi.login(loginValue).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
        });
      }),
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState(new AuthStateModel());
  }

  @Action(RecoverPassword)
  recoverPassword(ctx: StateContext<AuthStateModel>): Observable<any> {
    const username = ctx.getState().recoveryForm.model.username;
    return this.authApi.recoverPassword(username);
  }

  @Action(ChangePassword)
  changePassword(ctx: StateContext<AuthStateModel>): Observable<any> {
    const model: ChangePasswordDto = ctx.getState().changePasswordForm.model;
    return this.authApi.changePassword(model);
  }

  @Action(ResetPassword)
  resetPassword(ctx: StateContext<AuthStateModel>): Observable<any> {
    const newPassword = ctx.getState().resetPasswordForm.model.newPassword;
    return this.authApi.resetPassword(newPassword);
  }
}
