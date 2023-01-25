import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, catchError, from, map, tap, Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';

const GYMS = [
  {name: 'Hydrogen', weight: 1.0079, address: 'Hercules city blablabla hhghghg'},
  {name: 'Helium', weight: 4.0026, address: 'He'},
  {name: 'Lithium', weight: 6.941, address: 'Li'},
  {name: 'Beryllium', weight: 9.0122, address: 'Be'},
  {name: 'Boron', weight: 10.811, address: 'B'},
  {name: 'Carbon', weight: 12.0107, address: 'C'},
  {name: 'Nitrogen', weight: 14.0067, address: 'N'},
  {name: 'Oxygen', weight: 15.9994, address: 'O'},
  {name: 'Fluorine', weight: 18.9984, address: 'F'},
];

@Injectable({
  providedIn: 'root'
})
export class GymService {
    getGyms(id: number | string): Observable<any> {
      return of(GYMS);
    }
  
    getHero(id: number | string) {
      return this.getGyms(id).pipe(
        map((gyms) => gyms.find(gym => gym.id === +id)!)
      );
    }

}
