import { LoginComponent } from './containers/login/login.component';
import { AuthComponent } from './auth.component';
import { PasswordRecoveryComponent } from './containers/password-recovery/password-recovery.component';

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
    }
  ],
};
