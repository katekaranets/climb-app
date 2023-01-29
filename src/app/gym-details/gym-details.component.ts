import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { GymApiService } from '../services/gym.api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.scss']
})
export class GymDetailsComponent {
  public gym: any = {};
  public logo: any;
  public isMyGym: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
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

    this.userService.user$.subscribe(user => {
      this.isMyGym = !!user.gyms.filter(gym => (gym.id === this.gym.id)).length
    })

  }

  edit() {
console.log('edit');
  } 
}
