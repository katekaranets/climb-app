import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  private gymList = new BehaviorSubject<Array<any>>([]);
  gymList$ = this.gymList.asObservable();
  


  setGymList(list: Array<any>) {
    this.gymList.next(list);
  }
}