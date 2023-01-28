import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ClimbSearchComponent } from './climb-search/climb-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GymDetailsComponent } from './gym-details/gym-details.component';
import { TournamentComponent } from './tournament/tournament.component';

const routes: Routes = [
  {
    path: 'search',
    component: ClimbSearchComponent,
    pathMatch: 'full' 
    // canActivate: [ AuthGuard ]
  },
  {
    path: 'tournaments',
    component: TournamentComponent
  },
  { 
    path: 'tournaments/:id', 
  },
  {
    path: 'gym-list',
    component: SearchResultComponent,
    data: {some_data: 'some value'}
  },
  { 
    path: 'gym/:id', 
    component: GymDetailsComponent

  //   <a [routerLink]="['/hero', hero.id]">
  //   <span class="badge">{{ hero.id }}</span>{{ hero.name }}
  // </a>
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
