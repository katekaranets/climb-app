import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, tap, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class GymApiService {

  
  constructor(
    private router: Router, 
    private http: HttpClient
    ) {}

  search(country: any, city: any, q: any): Observable<any> {
    return this.http.get('/api/search/gyms', {
      params: {
        country,
        city,
        q
      }})
  }

  getGym(id:string): Observable<any> {
    return this.http.get(`/api/gyms/${id}`)
  }
  
  getCountryList(): Observable<any> {
    return this.http.get('/api/search/geo', {
      params: {
        objType: 'country'
      }})
  }

  getCityList(country: string): Observable<any>  {
    return this.http.get('/api/search/geo', {
      params: {
        objType: 'city',
        country
      }})
  }

}
