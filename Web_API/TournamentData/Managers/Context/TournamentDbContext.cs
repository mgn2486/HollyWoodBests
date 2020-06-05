using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.Models;

namespace TournamentData.Context
{
  public class TournamentDbContext : DbContext
  {
      public TournamentDbContext() : base("DefaultConnection")
      {
        
      }

      public DbSet<TournamentModel> Tournament { get; set; }
      public DbSet<EventDetailModel> EventDetail { get; set; }
      public DbSet<EventDetailStatusModel> EventDetailStatus { get; set; }
      public DbSet<EventModel> Event { get; set; }


  }
}
