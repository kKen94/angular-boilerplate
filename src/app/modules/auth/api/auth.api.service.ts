import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../core/services/config.service';
import { ChangePasswordDto, LoginDto, SignUpDto } from '../models';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) {}

  login(loginValue: LoginDto): Observable<{ _: unknown; token: string }> {
    return this.http.post<{ _: unknown; token: string }>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/sign-in`,
      loginValue,
    );
  }

  recoverPassword(username: string): Observable<unknown> {
    return this.http.get<unknown>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/recover-password/${username}`,
    );
  }

  changePassword(dto: ChangePasswordDto): Observable<unknown> {
    return this.http.post<unknown>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/change-password`,
      dto,
    );
  }

  resetPassword(newPassword: string): Observable<unknown> {
    return this.http.post<unknown>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/reset-password`,
      newPassword,
    );
  }

  signUp(model: SignUpDto): Observable<unknown> {
    return this.http.post<unknown>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/sign-up`,
      model,
    );
  }
}
