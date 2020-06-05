using System;

namespace TournamentData.Models
{
  public class EventDetailModel
  {
    public int Id { get; set; }
    public string EventDetailName { get; set; }
    public string EventDetailNumber { get; set; }
    public DateTime EventDateTime { get; set; }
    public DateTime EventEndDateTime { get; set; }
    public Decimal EventDetailOdd { get; set; }
    public int AutoClose { get; set; }
    public int EventDetailStatus { get; set; }
    public int FirstTime { get; set; }
    public EventModel EventModel { get; set; }
  }
}
