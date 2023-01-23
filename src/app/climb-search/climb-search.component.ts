import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-climb-search',
  templateUrl: './climb-search.component.html',
  styleUrls: ['./climb-search.component.scss']
})
export class ClimbSearchComponent {
  
  constructor (
    private router: Router,
    private formBuilder: FormBuilder) {}

  public searchForm = this.formBuilder.group({
    country: ['',Validators.required],
    city: ['',Validators.required]
  });

  public search() {
    this.router.navigate(['result']);
    console.log('search')
  }
}
