import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, tap, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private $auth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public get $isAuthenticated(): Observable<boolean> {
    return this.$auth.asObservable();
  }

  constructor(
    private router: Router, 
    private http: HttpClient
    ) {}

  public ngOnDestroy(): void {
    // this.$auth.next(false);
    // this.$auth.complete();
  }

  public getUser(): Observable<any> {
    return this.http.get('/api/user');
  }

  public isAuthorized() {
    const token = localStorage.getItem('token') || null;
    return !!token;
  }

  public login(email:string, password:string ): Observable<any> {
    return this.http.post('/api/auth/sign-in', {username: email, password}).pipe(
      shareReplay(),
      map((value) => {
        this.handleSignInResponse(value)
        return value
      })
    )
  }

  public signup(email:string, password:string, name: string): Observable<any> {
    return this.http.post('/api/auth/sign-up', {username: name, password, email}).pipe(
      shareReplay(),
      map((value) => {
        this.handleSignInResponse(value)
        return value
      })
      )
  }

  public logout(): Observable<any> {
    return of({ loggedIn: true })
      .pipe(
        map(() => {
          this.$auth.next(false);
          localStorage.removeItem('token');
          this.router.navigate(['/api/login']);
        })
      )
  }

  private handleSignInResponse(value: any): void {
    if (!value.token) {
      throw new Error(`We cannot sing you in`);
    }
    this.$auth.next(true);
    localStorage.setItem('token', value.token)
    this.router.navigate(['/api/search']);
  }

  public getAuthToken():string | null {
    const token = localStorage.getItem('token') || null;
    return token;
  }

}
