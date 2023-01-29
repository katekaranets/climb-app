import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
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

  constructor(
    private router: Router,
    private gymService: GymService,
    private gymApiService: GymApiService,

  ){}

  ngOnInit() {
    this.gymService.gymList$
      .subscribe(value => {
        this.gymList = [...value];
      })
  }

  openGymPage(gym: any) {
    this.router.navigateByUrl(`gym/${gym.id}`)
  }
}

