import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './navigation/header/header.component';
import { UserComponent } from './user/user.component';
import { ApplayoutComponent } from './applayout/applayout.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { TournamentsComponent } from './hollywood-tournaments/tournaments/tournaments.component';
import { TournamentsNavigationComponent } from './hollywood-tournaments/tournaments-navigation/tournaments-navigation.component';
import { TournamentsEventListComponent } from './hollywood-tournaments/tournaments-event-list/tournaments-event-list.component';
import { TournamentService } from './shared/services/tournament-service/tournament.service';
import { UserService } from './shared/services/User-Service/user.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminComponent } from './Administration/admin/admin.component';
import { UsersComponent } from './Administration/users/users.component';
import { DashboardComponent } from './Administration/dashboard/dashboard.component';
import { CreateTournamentComponent } from './Administration/create-tournament/create-tournament.component';
import { CreateEventComponent } from './Administration/create-event/create-event.component';
import { CreateEventDetailComponent } from './Administration/create-event-detail/create-event-detail.component';
import { AllTournamentsComponent } from './Administration/all-tournaments/all-tournaments.component';
import { AllEventsComponent } from './Administration/all-events/all-events.component';
import { AllEventDetailsComponent } from './Administration/all-event-details/all-event-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    FooterComponent,
    HeaderComponent,
    ApplayoutComponent,
    SidenavListComponent,
    TournamentsComponent,
    TournamentsNavigationComponent,
    TournamentsEventListComponent,
    ForbiddenComponent,
    AdminComponent,
    UsersComponent,
    DashboardComponent,
    CreateTournamentComponent,
    CreateEventComponent,
    CreateEventDetailComponent,
    AllTournamentsComponent,
    AllEventsComponent,
    AllEventDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule, MaterialModule, FlexLayoutModule,
    FormsModule, ReactiveFormsModule, AppRoutingModule,
    BrowserAnimationsModule, ToastrModule.forRoot({
      progressBar:true
    })
  ],
  providers: [TournamentService, UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
