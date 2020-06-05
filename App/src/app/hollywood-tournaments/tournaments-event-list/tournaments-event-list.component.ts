import { Component, OnInit, Input } from '@angular/core';
import { TournamentService } from 'src/app/shared/services/tournament-service/tournament.service';
import { ITournamentEventModel } from 'src/app/shared/models/tournaments.model';

@Component({
  selector: 'app-tournaments-event-list',
  templateUrl: './tournaments-event-list.component.html',
  styleUrls: ['./tournaments-event-list.component.css']
})

export class TournamentsEventListComponent implements OnInit {

  @Input() public tournamentName = '';

  public eventsList: ITournamentEventModel[] = []; 
  public filterList: string[] = []; 
  
  constructor(private tournamentService: TournamentService) { }

  getEventsForTournament() {
    return this.tournamentService.getEventsByTournamentName( this.tournamentName).then( tournamenEvents => {
       this.eventsList = tournamenEvents;
    });
  }

/*     CREATE AN EVENT DETAILS FILTER

  getFilteringOptionsist(listToFiltert:ITournamentEventModel):string
  {
    (listToFiltert)=> {
      x = listToFiltert.sel
    }
  }
*/
  
  ngOnChanges() {
    this.getEventsForTournament();
  }

  ngOnInit() {  
  }

}
