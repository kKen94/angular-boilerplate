import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AUTH_STATE_TOKEN } from '../../modules/auth/state/auth/auth.state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(AUTH_STATE_TOKEN).token;
    const authReq = !!token
      ? req.clone({
          setHeaders: { Authorization: 'Bearer ' + token },
        })
      : req;
    return next.handle(authReq);
  }
}
