import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { GymService } from '../gym.service';

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
    private gymService: GymService
  ) {}
  
  ngOnInit() {
    this.gym$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.gymService.getGyms(params.get('id')!))
    );
  }

  goToGymList(gym: any) {
    const gymId = gym ? gym.id : null;
    this.router.navigate(['/gymlist', { id: gymId, foo: 'foo' }]);
  }
}
