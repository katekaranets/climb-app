import { Component} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GymApiService } from '../services/gym.api.service';

@Component({
  selector: 'app-create-gym',
  templateUrl: './create-gym.component.html',
  styleUrls: ['./create-gym.component.scss']
})
export class CreateGymComponent {
  public isAuthorized: boolean = false;
  public gym: any;
  public countries: Array<any> = [];
  public cities: Array<any> = [];
  public gymForm: FormGroup = new FormGroup({
    country:  new FormControl('', {
      updateOn: 'blur'
    }),
    city: new FormControl('', {
      updateOn: 'blur'
    }),
    title: new FormControl('', {
      updateOn: 'blur'
    }),
    address: new FormControl('', {
      updateOn: 'blur'
    }),
    description: new FormControl('', {
      updateOn: 'blur'
    })
  });

  constructor(
    private router: Router,
    private authService: AuthService,

    private gymApiService: GymApiService){}

  ngOnInit() {
    this.isAuthorized = this.authService.isAuthorized();
    this.gymForm.controls['country'].valueChanges
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
  
  save() {
    this.gymApiService.createGym(this.gymForm.value).subscribe(gym => {
      this.router.navigateByUrl(`gym/${gym.id}`)
    })
  }
}
