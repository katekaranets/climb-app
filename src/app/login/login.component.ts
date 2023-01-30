import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pipe, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GymService } from '../services/gym.service';

export class MyErrorStateMatcher implements MyErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginForm = this.formBuilder.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  isLoggedIn: boolean = false;

  matcher = new MyErrorStateMatcher();


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private gymService: GymService,
    private router: Router
  ) {}

  login() {
    const val = this.loginForm.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .pipe(switchMap(() => {
          return this.authService.getUser()
        }))
        .subscribe(user => {
          this.gymService.setGymList(user.gyms);
          this.router.navigate(['/search'])
        });
    }
  }
}
