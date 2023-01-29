import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { GymApiService} from '../services/gym.api.service';
import { GymService } from '../services/gym.service';

@Component({
  selector: 'app-climb-search',
  templateUrl: './climb-search.component.html',
  styleUrls: ['./climb-search.component.scss']
})
export class ClimbSearchComponent {
  public countries: Array<any> = [];
  public cities: Array<any> = [];
  public searchForm1: FormGroup = new FormGroup({});
  public searchForm: FormGroup = new FormGroup({
    country:  new FormControl('', {
      updateOn: 'blur'
    }),
    city: new FormControl('', {
      updateOn: 'blur'
    }),
    q: new FormControl('', {
      updateOn: 'blur'
    })
})

  constructor (
    private router: Router,
    private gymApiService: GymApiService,
    private gymService: GymService) {}

  ngOnInit() {
    this.initializeForm();

    this.searchForm.controls['country'].valueChanges
    .pipe(
      switchMap(value => {
        return this.gymApiService.getCityList(String(value))
      })
    )
    .subscribe(cities => {
      this.cities = [...cities];
    });

    this.gymApiService.getCountryList()
      .subscribe(value => {
        this.countries = [...value];
    });
  }

  initializeForm() {
    this.searchForm.setValue({
      country: '',
      city: '',
      q: ''
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

  public openAllGymsList() {
    this.router.navigate(['gym-list']);
  }
}
