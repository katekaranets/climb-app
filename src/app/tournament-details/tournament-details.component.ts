import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { GymApiService } from '../services/gym.api.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent {
  public gym$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GymApiService
  ) {}

  ngOnInit() {
    this.gym$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getGym(params.get('id')!))
    );
  }

  // gotoHeroes(hero: Hero) {
  //   const heroId = hero ? hero.id : null;
  //   // Pass along the hero id if available
  //   // so that the HeroList component can select that hero.
  //   // Include a junk 'foo' property for fun.
  //   this.router.navigate(['/superheroes', { id: heroId, foo: 'foo' }]);
  // }
}
