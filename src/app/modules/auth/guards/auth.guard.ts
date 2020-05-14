import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthFacade } from '../auth.facade.service';
import { AuthState } from '../state/auth/auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private facade: AuthFacade) {}

  canActivate() {
    const result = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (result) {
      return true;
    } else {
      this.facade.logout();
      return false;
    }
  }
}
