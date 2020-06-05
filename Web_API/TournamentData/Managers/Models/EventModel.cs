using System;
using System.Collections.Generic;

namespace TournamentData.Models
{
  public class EventModel
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int EventNumber { get; set; }
    public DateTime EventDateTime { get; set; }
    public DateTime EventEndDateTime { get; set; }
    public int AutoClose { get; set; }
    public TournamentModel Tournament { get; set; }
    public ICollection<EventDetailModel> EventDetailModel { get; set; }
  }
}
