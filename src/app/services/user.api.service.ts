import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  constructor(
    private http: HttpClient
  ) {}

  getUser(): Observable<any> {
    return this.http.get(`/api/user`)
  }
}
