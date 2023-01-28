import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { GymApiService } from '../services/gym.api.service';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.scss']
})
export class GymDetailsComponent {
  gym$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gymApiService: GymApiService
  ) {}
  
  ngOnInit() {
    this.gym$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.gymApiService.getGyms(params.get('id')!))
    );
  }

  goToGymList(gym: any) {
    const gymId = gym ? gym.id : null;
    this.router.navigate(['/gymlist', { id: gymId, foo: 'foo' }]);
  }
}
