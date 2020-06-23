import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CalendarApi {

  constructor(private http: HttpClient) {}

  fetch(): Observable<any> {
    return of({});
  }

}
