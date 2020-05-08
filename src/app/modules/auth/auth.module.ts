import { NgModule } from '@angular/core';
import { LoginComponent } from './containers/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { AuthApi } from './api';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordRecoveryComponent } from './containers/password-recovery/password-recovery.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

const AUTH_COMPONENTS = [
  AuthComponent,
  LoginComponent,
  PasswordRecoveryComponent,
];

@NgModule({
  declarations: AUTH_COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
  ],
  providers: [
    AuthApi,
  ],
})
export class AuthModule {}
