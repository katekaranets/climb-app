import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { combineAll, combineLatest, combineLatestWith, Observable, switchMap } from 'rxjs';
import { GymApiService } from '../services/gym.api.service';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.scss']
})
export class GymDetailsComponent {
  public gym: any = {};
  public logo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gymApiService: GymApiService
  ) {}
  
  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.logo = this.gymApiService.getGymLogo(String(params.get('id')));
          return this.gymApiService.getGym(String(params.get('id')))
        })
      )
      .subscribe(gym => {
        this.gym = {...gym}
      })
  }

  goToGymList(gym: any) {
    const gymId = gym ? gym.id : null;
    this.router.navigate(['/gymlist', { id: gymId, foo: 'foo' }]);
  }
}
