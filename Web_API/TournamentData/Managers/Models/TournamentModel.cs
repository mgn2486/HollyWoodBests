using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TournamentData.Models
{
  public class TournamentModel
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<EventModel> EventModel { get; set; }

  }
}
