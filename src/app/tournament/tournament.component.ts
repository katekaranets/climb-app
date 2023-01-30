import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { TournamentApiService } from '../services/tournament.api.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent {
  displayedColumns: string[] = ['gym', 'start', 'end', 'country', 'city', 'available_spots', 'registration'];
  public tournamentsList: Array<any> = [];

  constructor(
    private router: Router,
    private tournamentService: TournamentApiService){}
  
  ngOnInit() {
    this.tournamentService.getTournaments()
    .pipe(map(items => {
      return items.map(element => {
        return { 
          ...element, 
          start: this.convertDate(element.start),
          end: this.convertDate(element.end)
        };
      });
    }))
    .subscribe( value => {
      this.tournamentsList = [...value];
    })
  }

  register(tournament: any) {
    this.router.navigateByUrl(`tournament/${tournament.id}`)
  }

  convertDate(unix_timestamp: any) {
    return new Date(unix_timestamp * 1000);
  }
}
