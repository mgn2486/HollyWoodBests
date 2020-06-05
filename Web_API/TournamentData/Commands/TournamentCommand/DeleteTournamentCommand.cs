using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.ApplicationModels;
using TournamentData.ApplicationTypes;
using TournamentData.Context;
using TournamentData.Enums;
using TournamentData.SystemMessages;

namespace TournamentData.Commands.TournamentCommand
{
  public class DeleteTournamentCommand : ICommand
  {
    private int _tournamentid;
    private IDataRepository<Tournament> _tournamentDataRepository;

    public DeleteTournamentCommand(int tournamentid, TournamentDbContext context)
    {
      _tournamentid = tournamentid;
      _tournamentDataRepository = new TournamentDataRespository(context);
    }
    
    public void HandleCommand(out ISystemResponseMessages responseMessage)
    {
      var tournamentsList = _tournamentDataRepository.GetAll();
      var doesTournamentExist = DoesTournamentExist(tournamentsList, _tournamentid);

      if (doesTournamentExist)
      {
        try
        {
          _tournamentDataRepository.Delete(_tournamentid);
          responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Success, "Tournament Deleted");
          return;
        }
        catch (Exception ex)
        {
          responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Failure, "Error Occured : " + ex);
        }
      }
      responseMessage = new SystemResponseMessages(ApplicationResponseMessagesEnum.Failure, "Tournament doesn't exist.");
      
    }

    private bool DoesTournamentExist(IEnumerable<Tournament> TournamentList, int id)
    {
      return TournamentList.Any(x => x.Id == id);
    }
  }
}
