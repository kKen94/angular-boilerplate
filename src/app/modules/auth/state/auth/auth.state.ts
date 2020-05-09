import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthApi } from '../../api';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Login, Logout, RecoverPassword } from './auth.actions';
import { FormState } from '../../../../shared/models';
import { LoginDto } from '../../models';

/******************************** STATE MODEL ********************************/

interface AuthStateModel {
  token: string | null;
  callbackUrl: string;
  recoveryForm: FormState<{username: string}>;
  loginForm: FormState<LoginDto>;
}

class AuthStateModel {
  constructor() {
    this.token = null;
    this.callbackUrl = '/';
    this.recoveryForm = new FormState();
    this.loginForm = new FormState();
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

  constructor(
    private authApi: AuthApi,
  ) { }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>): Observable<{ token: string }> {
    const loginValue = ctx.getState().loginForm.model;
    return this.authApi.login(loginValue).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
        });
      })
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
}
