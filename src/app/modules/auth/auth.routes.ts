import { AuthComponent } from './auth.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { LoginComponent } from './containers/login/login.component';
import { PasswordRecoveryComponent } from './containers/password-recovery/password-recovery.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';

export const authRoutes = {
  path: 'auth',
  component: AuthComponent,
  children: [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'password-recovery',
      component: PasswordRecoveryComponent,
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent,
    },
    {
      path: 'reset-password',
      component: ResetPasswordComponent,
    },
  ],
};
