import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ITournamentEventModel, TournamentEventModel } from '../../models/tournaments.model';
import { ITournamentModel } from '../../models/tournament.Model';
import { IEventModel } from '../../models/event.Model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private hollywoodTournamentssUrl = "assets/api/tournaments/hollywoodEvents.json";
  readonly rootUrl = 'http://localhost:51618/';

  constructor(private http: HttpClient) { }


  getAllTournamentEvents(): Observable<ITournamentEventModel[]> {
    return this.http.get<ITournamentEventModel[]>(this.hollywoodTournamentssUrl);
  }  

  getTournamentNames(): Promise<string[]> {
    return this.getAllTournamentEvents().toPromise<TournamentEventModel[]>()
      .then(tournamentEvents => tournamentEvents.map(tEvent => tEvent.tournamentName));
  }
  

  getEventsByTournamentName(tournamentName: string): Promise<TournamentEventModel[]> {
    if(tournamentName === 'all')
    {
      return this. getAllTournamentEvents().toPromise();
    }
    return this.getAllTournamentEvents().toPromise().then(tevents => tevents.filter(events => events.tournamentName === tournamentName));
  }

  getAllTournamentsList(): Observable<ITournamentModel[]>{
    return this.http.get<ITournamentModel[]>(this.rootUrl + 'api/tournaments');
  }

  CreateTournamanet(tournamentnName: string, currentUser: string)
  {
    const body: any = {
      Name: tournamentnName,
      createdBy: currentUser, //this should be coming from the user service
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'api/tournament/create', body,{headers : reqHeader});
  }

  CreateEvent(tournamentEvent: IEventModel, currentUser: string)
  {
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'api/event/create', tournamentEvent,{headers : reqHeader});
  }

  DeleteTournament(id: number)
  {
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'api/tournament/delete', id,{headers : reqHeader});
  }

  DeleteEvent(id: number)
  {
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'api/event/delete', id,{headers : reqHeader});
  }
  

  getUniqueTournamentNames(): Observable<any>{
    const tournamentNames = new Subject();
    this.getTournamentNames().then(eventd => {
      const eventSet = new Set(eventd);
      eventSet.forEach(tournamentName => {
        tournamentNames.next({ name: tournamentName })
      });
    });
    return tournamentNames;
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}
