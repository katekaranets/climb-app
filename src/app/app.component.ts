import { Component } from '@angular/core';
import { Subject, takeUntil, take } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Climb App';
  public isAuthenticated = false;
  private $destroy = new Subject<void>();


  constructor(private authService: AuthService) { 
    console.log('hello12345' + environment.production); // Logs false for development environment
  }


  public ngOnInit(): void {
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
