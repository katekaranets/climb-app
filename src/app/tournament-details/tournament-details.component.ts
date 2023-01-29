import { Component } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { TournamentApiService } from '../services/tournament.api.service';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent {
  public tournament: any = {};
  public logo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TournamentApiService,

  ) {}

  ngOnInit() {
    this.route.paramMap
    .pipe(
      switchMap((params: ParamMap) => {
        this.logo = this.service.getTournamentLogo(String(params.get('id')));
        return this.service.getTournament(String(params.get('id')))
      })
    )
    .subscribe(tournament => {
      this.tournament = {...tournament}
    })
  }

}
