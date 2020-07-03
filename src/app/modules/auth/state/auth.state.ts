import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormState } from '@model';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthApi } from '../api';
import {
  ChangePasswordDto,
  ChangePasswordForm,
  LoginDto,
  PasswordRecoveryForm,
  ResetPasswordForm,
  SignUpForm,
} from '../models';
import {
  ChangePassword,
  Login,
  Logout,
  RecoverPassword,
  ResetPassword,
  SignUp,
} from './auth.action';

/******************************** STATE MODEL ********************************/

interface AuthStateModel {
  token: string | undefined;
  callbackUrl: string;
  recoveryForm: FormState<PasswordRecoveryForm>;
  loginForm: FormState<LoginDto>;
  changePasswordForm: FormState<ChangePasswordForm>;
  signUpForm: FormState<SignUpForm>;
  resetPasswordForm: FormState<ResetPasswordForm>;
}

class AuthStateModel {
  constructor() {
    this.token = undefined;
    this.callbackUrl = '/';
    this.recoveryForm = new FormState();
    this.signUpForm = new FormState();
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
  /***************************** selectors ************************************/

  @Selector([AUTH_STATE_TOKEN])
  static token(state: AuthStateModel): string | undefined {
    return state.token;
  }

  @Selector([AUTH_STATE_TOKEN])
  static fullname(state: AuthStateModel): string | null {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(state.token);
    return decodedToken['given_name'];
  }

  @Selector([AUTH_STATE_TOKEN])
  static username(state: AuthStateModel): string | null {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(state.token);
    return decodedToken['unique_name'];
  }

  @Selector([AUTH_STATE_TOKEN])
  static email(state: AuthStateModel): string | null {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(state.token);
    return decodedToken['email'];
  }

  @Selector([AUTH_STATE_TOKEN])
  static userId(state: AuthStateModel): string | null {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(state.token);
    return decodedToken['nameid'];
  }

  @Selector([AUTH_STATE_TOKEN])
  static isAuthenticated(state: AuthStateModel): boolean {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(state.token);
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

  @Selector([AUTH_STATE_TOKEN])
  static signUpFormValidation(state: AuthStateModel) {
    return state.signUpForm.status === 'VALID';
  }

  constructor(private authApi: AuthApi) {}

  /*********************** actions ****************************/

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

  @Action(SignUp)
  signUp(ctx: StateContext<AuthStateModel>): Observable<any> {
    const model = ctx.getState().signUpForm.model;
    return this.authApi.signUp(model);
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
