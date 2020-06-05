export interface ITournamentEventModel{    
    tournamentName: string,        
    eventName: string,
    eventNumber: number,
    eventStartDate: string,
    eventEndDate: Date,
    eventDetailName: string,
    eventDetailNumber: number,
    eventDetailOdd: string,
    finishPosition: string,
    firstTime: number,
    eventStatus: string
}

export class TournamentEventModel {
    constructor(
        public tournamentName: string,        
        public eventName: string,
        public eventNumber: number,
        public eventStartDate: string,
        public eventEndDate: Date,
        public eventDetailName: string,
        public eventDetailNumber: number,
        public eventDetailOdd: string,
        public finishPosition: string,
        public firstTime: number,
        public eventStatus: string) { }
}
