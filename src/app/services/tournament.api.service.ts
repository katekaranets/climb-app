import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, tap, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class TournamentApiService {

  constructor(
    private router: Router, 
    private http: HttpClient
    ) {}

  getTournaments(): Observable<any> {
    return this.http.get('/api/search/comp')
  }

  getTournament(id:string): Observable<any> {
    return this.http.get(`/api/comp/${id}`)
  }

  getTournamentLogo(id: string): string {
    return `http://localhost:8000/api/comp/logo/${id}`;
  }

  updateTournament(id: string): Observable<any> {
    return this.http.post(`/api/comp/${id}`, {}) 
  }
  
  // getCountryList(): Observable<any> {
  //   return this.http.get('/api/search/geo', {
  //     params: {
  //       objType: 'country'
  //     }})
  // }

  // getCityList(country: string) {
  //   return this.http.get('/api/search/geo', {
  //     params: {
  //       objType: 'city',
  //       country
  //     }})
  // }

}
