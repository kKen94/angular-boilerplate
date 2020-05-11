import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChangePasswordDto, LoginDto } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApi {
  constructor(private http: HttpClient) {}

  login(loginValue: LoginDto): Observable<any> {
    return this.http.post<any>('https://localhost:5001/api/v1/users/auth/sign-in', loginValue);
  }

  recoverPassword(username: string): Observable<any> {
    return this.http.get<any>(`https://localhost:5001/api/v1/users/auth/recover-password/${username}`);
  }

  changePassword(dto: ChangePasswordDto): Observable<any> {
    return this.http.post<any>(`https://localhost:5001/api/v1/users/auth/change-password`, dto);
  }

  resetPassword(newPassword: string): Observable<any> {
    return this.http.post<any>(`https://localhost:5001/api/v1/users/auth/reset-password`, newPassword);
  }
}
