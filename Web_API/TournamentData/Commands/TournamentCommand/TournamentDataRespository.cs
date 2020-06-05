using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.ApplicationModels;
using TournamentData.ApplicationTypes;
using TournamentData.Context;
using TournamentData.Models;

namespace TournamentData.Commands.TournamentCommand
{
  public class TournamentDataRespository : IDataRepository<Tournament>
  {
    public readonly TournamentDbContext _coneTournamentDbContext;
    public TournamentDataRespository(TournamentDbContext coneTournamentDbContext)
    {
      _coneTournamentDbContext = coneTournamentDbContext;
    }


    public IEnumerable<Tournament> GetAll()
    {
      var tournaments = new List<Tournament>();

      var tounaments = _coneTournamentDbContext.Tournament.ToList();
      foreach (var tournament in tounaments)
      {
        tournaments.Add(new Tournament() { Id = tournament.Id , Name = tournament.Name});
      }

      return tournaments;
    }

    public Tournament GetById(int Id)
    {
      throw new NotImplementedException();
    }

    public void Create(Tournament DataModel)
    {
      using (_coneTournamentDbContext)
      {
        var tournament = new TournamentModel();
        tournament.Name = DataModel.Name;
        _coneTournamentDbContext.Tournament.Add(tournament);
        _coneTournamentDbContext.SaveChanges();
      }
    }

    public void Update(Tournament DataModel)
    {
      throw new NotImplementedException();
    }

    public void Delete(int Id)
    {
      using (_coneTournamentDbContext)
      {
        var modelToDelete = _coneTournamentDbContext.Tournament.Find(Id);
        _coneTournamentDbContext.Tournament.Remove(modelToDelete);
        _coneTournamentDbContext.SaveChanges();
      }
    }

    public void Save()
    {
      throw new NotImplementedException();
    }
  }
}
