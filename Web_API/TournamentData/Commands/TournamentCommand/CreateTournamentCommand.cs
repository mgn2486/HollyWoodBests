using System;
using System.Collections.Generic;
using System.Linq;
using TournamentData.ApplicationModels;
using TournamentData.ApplicationTypes;
using TournamentData.Context;
using TournamentData.Enums;
using TournamentData.Models;
using TournamentData.SystemMessages;

namespace TournamentData.Commands.TournamentCommand
{
  public class CreateTournamentCommand : ICommand
  {
    private Tournament _tournamentModel;
    private IDataRepository<Tournament> _tournamentDataRepository;

    public CreateTournamentCommand(Tournament tournament, TournamentDbContext context)
    {
      _tournamentModel = tournament;
      _tournamentDataRepository = new TournamentDataRespository(context);
    }
    public void HandleCommand(out ISystemResponseMessages responseMessage)
    {
      var tournamentsList = _tournamentDataRepository.GetAll();
      var doesTournamentExists = DoesTournamentExist(tournamentsList);

      if (doesTournamentExists)
      {
        responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Failure, "Tournament Already exists.");
        return;
      }

      try
      {
        _tournamentDataRepository.Create(_tournamentModel);
        responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Success, "Tournament Created");
      }
      catch (Exception ex)
      {
        responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Failure, "Error Occured : " + ex);
      }
    }

    private bool DoesTournamentExist(IEnumerable<Tournament> TournamentList)
    {
      return TournamentList.Any(x => x.Name == _tournamentModel.Name);
    }
  }
}
