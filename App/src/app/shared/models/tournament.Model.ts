export interface ITournamentModel{    
    tournamentName: string,
     createdBy: string
}

export class ITournamentModel {
    constructor(
        public tournamentName: string,
        public createdBy: string) { }
}
