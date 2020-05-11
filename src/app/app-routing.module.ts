import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './modules/auth/auth.component';
import { authRoutes } from './modules/auth/auth.routes';
import { AuthModule } from './modules/auth/auth.module';
// import { AuthResolver } from './modules/auth/auth-resolver.service';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('src/app/modules/pages/pages.module').then(m => m.PagesModule),
  },
  authRoutes,

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
  // enableTracing: true,
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config), AuthModule],
  exports: [RouterModule],
  // providers: [AuthResolver],
})
export class AppRoutingModule {}
