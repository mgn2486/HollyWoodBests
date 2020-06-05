import { Component, OnInit } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament-service/tournament.service';

@Component({
  selector: 'app-tournaments-navigation',
  templateUrl: './tournaments-navigation.component.html',
  styleUrls: ['./tournaments-navigation.component.css']
})
export class TournamentsNavigationComponent implements OnInit {

  public tournamentNames: any[] = [];
  navbarOpen = false;
  
  constructor(private tournamentService: TournamentService) { }

  getTournamentNames(): any {
    return this.tournamentService.getUniqueTournamentNames()
      .subscribe(response => 
        this.tournamentNames.push(response)
      );
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  ngOnInit() {
    this. getTournamentNames();
  }

}
