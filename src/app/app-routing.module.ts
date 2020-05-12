import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { authRoutes } from './modules/auth/auth.routes';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('src/app/modules/pages/pages.module').then(m => m.PagesModule),
  },
  authRoutes,

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
  onSameUrlNavigation: 'reload',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
