import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GymApiService } from '../services/gym.api.service';
import { TournamentApiService } from '../services/tournament.api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: any = {};
  @Input() isTournament = false;
  @Input() logo: string = '';
  @Input() isMyItem = false;

  @Output() onSave: EventEmitter<FormGroup> = new EventEmitter();

  public isAuthorized: boolean = false;
  public isRegistered: boolean = false;
  public gym: any;
  public isEditMode: boolean =  false;
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
  public comments: Array<any>= [];

  constructor(
    private tournamentApiService: TournamentApiService,
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

  ngOnChanges(changes : SimpleChanges){
    if(changes['item'] && changes['item'].currentValue) {
      if(this.isTournament && this.item.gym) {
        this.gym = this.item.gym;
      } else {
        this.gym = this.item;
        if(JSON.stringify(this.gym) !== '{}') {
          this.gymForm.setValue({
            country: this.gym.country,
            city: this.gym.city,
            title: this.gym.title,
            address: this.gym.address,
            description: this.gym.description
          })
          this.gymApiService.getComments(this.gym.id).subscribe(comments => 
            this.comments = comments.map(element => {
              return { 
                ...element, 
                created_on: this.convertDate(element.created_on)
              };
            })
          )
        }
      }
    }
  }

  convertDate(unix_timestamp: any) {
    return new Date(unix_timestamp * 1000);
  }

  edit() {
    this.isEditMode = true;
  }
  
  save() {
    this.onSave.emit(this.gymForm);
    this.isEditMode = false;
  }

  cancel() {
    this.isEditMode = false;
  }

  sendRegistrartion () {
    this.tournamentApiService.updateTournament(this.item.id)
      .subscribe((value) => {
        this.isRegistered = value;
      });
  }
}
