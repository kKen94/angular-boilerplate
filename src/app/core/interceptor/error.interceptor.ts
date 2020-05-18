import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SweetHelper } from '@utility';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthFacade } from '../../modules/auth/auth.facade.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authFacade.logout();
        }

        const errs = err.error;
        if (errs && errs.length > 0) {
          for (const er of errs) {
            SweetHelper.fireToast(er.description, 'error');
          }
        } else if (errs && errs.developerMeesage) {
          SweetHelper.fireToast(errs.developerMeesage.Message, 'error');
        } else {
          const error = err.message || err.statusText;
          SweetHelper.fireToast(error, 'error');
        }
        throw new Error(err.error);
      }),
    );
  }
}
