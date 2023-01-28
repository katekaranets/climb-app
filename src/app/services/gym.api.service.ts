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

  getGyms(id: number | string): Observable<any> {
    return this.http.get('/api/search/gyms')

  }

  // getHero(id: number | string) {
  //   return this.getGyms(id).pipe(
  //     map((gyms) => gyms.find(gym => gym.id === +id)!)
  //   );
  // }
  
  getCountryList(): Observable<any> {
    return this.http.get('/api/search/geo', {
      params: {
        objType: 'country'
      }})
  }

  getCityList(country: string) {
    return this.http.get('/api/search/geo', {
      params: {
        objType: 'city',
        country
      }})
  }

}
