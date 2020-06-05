import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentService } from 'src/app/shared/services/tournament-service/tournament.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  public tournamentName = '';
  TournamentEventList = [];

  constructor(private route: ActivatedRoute,private router: Router, private tournamentService: TournamentService) { }

  getTournamentEvents(): any {
    this.tournamentService.getAllTournamentEvents().subscribe(response => {
      this.TournamentEventList = response;
    });
  }

  ngOnInit() {
    this.router.navigateByUrl('/tournaments/all');
    this.route.params.subscribe(p => this.tournamentName = p['tournamentName']);
  }

}
