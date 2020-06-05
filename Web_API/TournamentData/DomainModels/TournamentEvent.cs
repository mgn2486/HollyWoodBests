using System;
using System.Collections.Generic;
using TournamentData.ApplicationTypes;
using TournamentData.Models;

namespace TournamentData.DomainModels
{
  public class TournamentEvent : IDataModel
  {
    public string Name { get; set; }
    public int EventNumber { get; set; }
    public DateTime EventDateTime { get; set; }
    public DateTime EventEndDateTime { get; set; }
    public int AutoClose { get; set; }
    public int TournamentId { get; set; }
    public ICollection<EventDetailModel> EventDetailModel { get; set; }
  }
}
