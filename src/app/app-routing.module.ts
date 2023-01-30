import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClimbSearchComponent } from './climb-search/climb-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GymDetailsComponent } from './gym-details/gym-details.component';
import { TournamentComponent } from './tournament/tournament.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { CreateGymComponent } from './create-gym/create-gym.component';

const routes: Routes = [
  {
    path: 'search',
    component: ClimbSearchComponent,
    pathMatch: 'full' 
  },
  {
    path: 'tournaments',
    component: TournamentComponent,
    pathMatch: 'full'
  },
  { 
    path: 'tournament/:id',
    component: TournamentDetailsComponent,
    pathMatch: 'full'
  },
  { 
    path: 'add-gym',
    component: CreateGymComponent,
    pathMatch: 'full'
  },
  {
    path: 'gym-list',
    component: SearchResultComponent,
    pathMatch: 'full'
    // data: {some_data: 'some value'}
  },
  {
    path: 'my-gyms',
    component: SearchResultComponent,
    pathMatch: 'full'
    // data: {some_data: 'some value'}
  },
  { 
    path: 'gym/:id', 
    component: GymDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: '',
    component: ClimbSearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
