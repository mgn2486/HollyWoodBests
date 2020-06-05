export interface IEventModel{           
    eventName: string,
    eventNumber: number,
    eventDate: string,
    eventEndDate: Date,
    tournamentId: number
}

export class EventModel {
    constructor(
        public eventName: string,
        public eventNumber: number,
        public eventDate: string,
        public eventEndDate: Date,
        public tournamentId: number        
        ) { }
}
