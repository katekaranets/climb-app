import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GymApiService} from '../services/gym.api.service';
import { GymService } from '../services/gym.service';

@Component({
  selector: 'app-climb-search',
  templateUrl: './climb-search.component.html',
  styleUrls: ['./climb-search.component.scss']
})
export class ClimbSearchComponent {
  public countries: Array<any> = [];
  public citis: Array<any> = [];

  constructor (
    private router: Router,
    private gymApiService: GymApiService,
    private gymService: GymService,
    private formBuilder: FormBuilder) {}

  public searchForm = this.formBuilder.group({
    country: [''],
    city: [''],
    q: ['']
  });

  ngOnInit() {
    this.gymApiService.getCountryList().subscribe(value => {
      this.countries = [...value];
    })
  }

  public search() {
    let country, city, q;
    ({country, city, q} = this.searchForm.value);


    const val = this.searchForm.value;
    this.gymApiService.search(val.country, val.city, val.q).subscribe(value => {
      this.gymService.setGymList(value);
      this.router.navigate(['gym-list', value]);
    });
  }
}
