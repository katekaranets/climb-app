import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { GymService } from '../services/gym.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  displayedColumns: string[] = ['title', 'country', 'address', 'more'];
  public gymList: Array<any> = [];
  public value = null;

  // @ViewChild('paginator1') paginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('paginator1') pag: MatPaginator;

  constructor(private gymService: GymService){}

  ngOnInit() {
    this.gymService.gymList$.subscribe( value => {
      this.gymList = [...value];
    })
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

