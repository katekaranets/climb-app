import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

const GYMS = [
  {name: 'Hydrogen', weight: 1.0079, address: 'Hercules city blablabla hhghghg'},
  {name: 'Helium', weight: 4.0026, address: 'He'},
  {name: 'Lithium', weight: 6.941, address: 'Li'},
  {name: 'Beryllium', weight: 9.0122, address: 'Be'},
  {name: 'Boron', weight: 10.811, address: 'B'},
  {name: 'Carbon', weight: 12.0107, address: 'C'},
  {name: 'Nitrogen', weight: 14.0067, address: 'N'},
  {name: 'Oxygen', weight: 15.9994, address: 'O'},
  {name: 'Fluorine', weight: 18.9984, address: 'F'},
];

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  displayedColumns: string[] = ['name', 'address', 'more'];
  dataSource = GYMS;

  // @ViewChild('paginator1') paginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('paginator1') pag: MatPaginator;

  // constructor() {}

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

