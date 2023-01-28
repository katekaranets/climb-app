import { Component } from '@angular/core';
import { TournamentApiService } from '../services/tournament.api.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent {
  displayedColumns: string[] = ['gym', 'country', 'city', 'available_spots'];
  public tournamentsList: Array<any> = [];

  constructor(private tournamentService: TournamentApiService){}
  
  ngOnInit() {
    this.tournamentService.getTournaments().subscribe( value => {
      this.tournamentsList = [...value];
    })
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
