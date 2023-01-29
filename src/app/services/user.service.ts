import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<any>({});
  public user$ = this.user.asObservable();

  public setUser(user: Object) {
    this.user.next(user);
  }
}