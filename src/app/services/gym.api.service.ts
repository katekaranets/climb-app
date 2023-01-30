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
    return this.http.get(`/api/gym/${id}`)
  }

  updateGym(id: string, gymData: any): Observable<any> {
    return this.http.put(`/api/gym/${id}`, {
      country: gymData.country,
      city: gymData.city,
      address: gymData.address,
      title: gymData.title
    })
  }

  createGym(gymData: any):Observable<any> {
    return this.http.post(`/api/gym`, {
      country: gymData.country,
      city_id: gymData.city,
      address: gymData.address,
      title: gymData.title,
      description: gymData.description
    })
  }

  getGymLogo(id: string): string {
    return `http://localhost:8000/api/gym/logo/${id}`;
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

  getComments(id: string): Observable<any>  {
    return this.http.get(`/api/gym/comment/${id}`)
  }

  postComment(id: string, text: any): Observable<any> {
    return this.http.post(`/api/gym/comment/${id}`, {text})
  }

}
