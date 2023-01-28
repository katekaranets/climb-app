import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { GymApiService } from '../services/gym.api.service';
import { GymService } from '../services/gym.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  displayedColumns: string[] = ['title', 'country', 'address'];
  public gymList: Array<any> = [];
  public value = null;

  // @ViewChild('paginator1') paginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('paginator1') pag: MatPaginator;

  constructor(
    private router: Router,
    private gymService: GymService,
    private gymApiService: GymApiService

  ){}

  ngOnInit() {
    this.gymService.gymList$
    .pipe(
      switchMap(value => {
        if(!value || !value.length) {
          return this.gymApiService.search('', '', '');
        } else {
          this.gymList = [...value];
          return value
        }
      })
    )
    .subscribe(value => {
      this.gymList = [...value];
    })
  }

  openGymPage(gym: any) {
    this.router.navigateByUrl(`gym/${gym.id}`)
  }

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

