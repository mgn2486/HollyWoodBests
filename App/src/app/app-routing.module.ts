import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { TournamentsComponent } from "./hollywood-tournaments/tournaments/tournaments.component";
import { AuthGuard } from "./auth/auth.guard";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { DashboardComponent } from "./Administration/dashboard/dashboard.component";
import { AdminComponent } from "./Administration/admin/admin.component";
import { UsersComponent } from "./Administration/users/users.component";
import { CreateTournamentComponent } from "./Administration/create-tournament/create-tournament.component";
import { CreateEventComponent } from "./Administration/create-event/create-event.component";
import { CreateEventDetailComponent } from "./Administration/create-event-detail/create-event-detail.component";
import { AllTournamentsComponent } from "./Administration/all-tournaments/all-tournaments.component";
import { AllEventsComponent } from "./Administration/all-events/all-events.component";
import { AllEventDetailsComponent } from "./Administration/all-event-details/all-event-details.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'tournaments/:tournamentName', component: TournamentsComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'hollywoodUser', redirectTo:'/login', pathMatch : 'full'},
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },

  {
    path: 'dashboard',  component: DashboardComponent,  canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin', 'Member'] },
    children:[{ path : '', component: AdminComponent, canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin', 'Member'] },
    children:[{ path : 'users', component: UsersComponent, canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin'] }, },
              { path : 'create-tournament', component: CreateTournamentComponent , canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin', 'Member'] },},
              { path : 'all-tournaments', component: AllTournamentsComponent , canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin', 'Member'] },},
              { path : 'all-events', component: AllEventsComponent , canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin', 'Member'] },},
              { path : 'all-event-details', component: AllEventDetailsComponent , canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin', 'Member'] },},
              { path : 'create-event', component: CreateEventComponent , canActivate:[AuthGuard], data :{ permittedRoles:['SuperAdmin','Admin'] },}, 
              { path : 'create-event-detail', component: CreateEventDetailComponent , canActivate:[AuthGuard], data :{ permittedRoles:['Member'] },},]
      }]
  }




];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }