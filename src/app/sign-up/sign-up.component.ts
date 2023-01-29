import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public loginForm = this.formBuilder.group({
    email: ['',Validators.required],
    password: ['',Validators.required],
    name: ['',Validators.required]
  });

  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public signUp() {
    const val = this.loginForm.value;

    if (val.email && val.password && val.name) {
      this.authService.signup(val.email, val.password, val.name).subscribe();
    }
  }
}
