import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  private gymList = new BehaviorSubject<Array<any>>([]);
  public gymList$ = this.gymList.asObservable();

  public setGymList(list: Array<any>) {
    this.gymList.next(list);
  }

  public getGymList() {
    return this.gymList.getValue()
  }
}