import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from './../environments/environment.development';
import { UserService } from './services/user.service';
import { UserApiService } from './services/user.api.service';
import { GymService } from './services/gym.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Climb App';
  public user: any = {};
  public isAuthenticated = false;
  public allGymsSearchParams = {country: '', city: '', q:''}
  private $destroy = new Subject<void>();


  constructor(
    private authService: AuthService,
    private gymService: GymService,
    private userService: UserService,
    private userApiService: UserApiService
    ) {
    console.log(environment.apiUrl); 
  }


  public ngOnInit(): void {
    this.userApiService.getUser()
      .subscribe(user => {
        this.user = {...user};
        this.userService.setUser(user);
        this.gymService.setGymList(user.gyms);
      })

    this.authService.$isAuthenticated.pipe(
      takeUntil(this.$destroy)
    ).subscribe((isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated);
  }

  public ngOnDestroy(): void {
  }

  public logout(): void {
    this.authService.logout().subscribe();
  }
}
