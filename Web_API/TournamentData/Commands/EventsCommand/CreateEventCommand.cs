using System;
using System.Collections.Generic;
using System.Linq;
using TournamentData.ApplicationTypes;
using TournamentData.Context;
using TournamentData.DomainModels;
using TournamentData.Enums;
using TournamentData.SystemMessages;

namespace TournamentData.Commands.EventsCommand
{
  public class CreateEventCommand : ICommand
  {
    private TournamentEvent _tournamentEventModel;
    private IDataRepository<TournamentEvent> _eventsDataRepository;

    public CreateEventCommand(TournamentEvent tournamentEventModel, TournamentDbContext context)
    {
      _tournamentEventModel = tournamentEventModel;
      _eventsDataRepository = new EventDataRepository(context);
    }

    public void HandleCommand(out ISystemResponseMessages responseMessage)
    {
      var eventsList = _eventsDataRepository.GetAll();
      var doesEventExists = DoesEventExist(eventsList);

      if (doesEventExists)
      {
        responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Failure, "Event Already exists.");
        return;
      }

      try
      {
        _eventsDataRepository.Create(_tournamentEventModel);
        responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Success, "Event Created");
      }
      catch (Exception ex)
      {
        responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Failure, "Error Occured : " + ex);
      }
    }

    private bool DoesEventExist(IEnumerable<TournamentEvent> eventsList)
    {
      return eventsList.Any(x => x.Name == _tournamentEventModel.Name);
    }
  }
}
