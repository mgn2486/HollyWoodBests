using System.Collections.Generic;
using System.Linq;
using TournamentData.ApplicationModels;
using TournamentData.ApplicationTypes;
using TournamentData.Context;
using TournamentData.DomainModels;
using TournamentData.Models;

namespace TournamentData.Commands.EventsCommand
{
  public class EventDataRepository : IDataRepository<TournamentEvent>
  {
    public readonly TournamentDbContext _coneTournamentDbContext;

    public EventDataRepository(TournamentDbContext coneTournamentDbContext)
    {
      _coneTournamentDbContext = coneTournamentDbContext;
    }

    public IEnumerable<TournamentEvent> GetAll()
    {
        var events = new List<TournamentEvent>();

        var eventsList = _coneTournamentDbContext.Event.ToList();
        foreach (var eventRetrieved in eventsList)
        {
          events.Add(new TournamentEvent()
          {
            Name = eventRetrieved.Name, EventNumber = eventRetrieved.EventNumber, AutoClose = eventRetrieved.AutoClose, EventDateTime = eventRetrieved.EventDateTime
          });
        }

        return events;
    }

    public TournamentEvent GetById(int Id)
    {
      throw new System.NotImplementedException();
    }

    public void Create(TournamentEvent DataModel)
    {
      using (_coneTournamentDbContext)
      {
        var tournament = _coneTournamentDbContext.Tournament.Find(DataModel.TournamentId);
        var eventModel = new EventModel();
        eventModel.Name = DataModel.Name;
        eventModel.AutoClose = DataModel.AutoClose;
        eventModel.EventDateTime = DataModel.EventDateTime;
        eventModel.EventEndDateTime = DataModel.EventEndDateTime;
        eventModel.EventDetailModel = DataModel.EventDetailModel;
        eventModel.EventNumber = DataModel.EventNumber;
        eventModel.Tournament = tournament;
        _coneTournamentDbContext.Event.Add(eventModel);
        _coneTournamentDbContext.SaveChanges();
      }
    }

    public void Update(TournamentEvent DataModel)
    {
      throw new System.NotImplementedException();
    }

    public void Delete(int Id)
    {
      throw new System.NotImplementedException();
    }

    public void Save()
    {
      throw new System.NotImplementedException();
    }
  }
}
