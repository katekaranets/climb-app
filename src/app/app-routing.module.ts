import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ClimbSearchComponent } from './climb-search/climb-search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GymDetailsComponent } from './gym-details/gym-details.component';

const routes: Routes = [
  {
    path: 'search',
    component: ClimbSearchComponent,
    // canActivate: [ AuthGuard ]
  },
  {
    path: 'gym-list',
    component: SearchResultComponent
  },
  {
    path: 'tournaments',
    component: SearchResultComponent
  },
  { 
    path: 'gym/:id', 
    component: GymDetailsComponent
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
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
