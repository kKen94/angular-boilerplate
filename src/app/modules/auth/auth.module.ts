import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { AuthApi } from './api';
import { AuthComponent } from './auth.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { LoginComponent } from './containers/login/login.component';
import { PasswordRecoveryComponent } from './containers/password-recovery/password-recovery.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { AuthGuard } from './guards/auth.guard';

const AUTH_COMPONENTS = [
  AuthComponent,
  LoginComponent,
  PasswordRecoveryComponent,
  ChangePasswordComponent,
  ResetPasswordComponent,
];

@NgModule({
  declarations: [...AUTH_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxsFormPluginModule,
  ],
  providers: [AuthApi, AuthGuard],
})
export class AuthModule {}
