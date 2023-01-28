import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentApiService } from '../services/tournament.api.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent {
  displayedColumns: string[] = ['gym', 'country', 'city', 'available_spots', 'registration'];
  public tournamentsList: Array<any> = [];

  constructor(
    private router: Router,
    private tournamentService: TournamentApiService){}
  
  ngOnInit() {
    this.tournamentService.getTournaments().subscribe( value => {
      this.tournamentsList = [...value];
    })
  }

  register(tournament: any) {
    this.router.navigateByUrl(`tournament/${tournament.id}`)

  }

  // @ViewChild('paginator1') paginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('paginator1') pag: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}
