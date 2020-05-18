import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordDto, LoginDto, SignUpDto } from '../models';
import { ConfigService } from '../../../core/services/config.service';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) {}

  login(loginValue: LoginDto): Observable<any> {
    return this.http.post<any>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/sign-in`,
      loginValue,
    );
  }

  recoverPassword(username: string): Observable<any> {
    return this.http.get<any>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/recover-password/${username}`,
    );
  }

  changePassword(dto: ChangePasswordDto): Observable<any> {
    return this.http.post<any>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/change-password`,
      dto,
    );
  }

  resetPassword(newPassword: string): Observable<any> {
    return this.http.post<any>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/reset-password`,
      newPassword,
    );
  }

  signUp(model: SignUpDto): Observable<any> {
    return this.http.post<any>(
      `${ConfigService.settings.apiUrl}/v1/users/auth/sign-up`,
      model,
    );
  }
}
