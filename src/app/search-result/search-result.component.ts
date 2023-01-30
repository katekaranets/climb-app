import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Route, Router, RoutesRecognized } from '@angular/router';
import { filter, of, pairwise, switchMap } from 'rxjs';
import { GymApiService } from '../services/gym.api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  displayedColumns: string[] = ['title', 'country', 'address'];
  public gymList: Array<any> = [];
  public value = null;
  public isMyGym = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gymApiService: GymApiService,
    private userService: UserService
  ){}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params: any) => {
        let {country, city, q} = params.params;
        if (!('country' in params.params)) {
          return of(this.userService.getUser().gyms);
        }
        return this.gymApiService.search(country, city, q)
      })
    )
    .subscribe(gyms => {
      if(gyms && gyms.length) {
        this.gymList = [...gyms]
      }
    })
  }

  openGymPage(gym: any) {
    this.router.navigateByUrl(`gym/${gym.id}`)
  }

  addNewGym() {
    this.router.navigateByUrl(`add-gym`)
  }
}

