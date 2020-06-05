using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.ApplicationTypes;
using TournamentData.Enums;
using TournamentData.SystemMessages;

namespace TournamentData
{
    public class TournamentDomainClient : ITournamentDomainClient
  {
    public void PerformCommand<T>(T command, out ISystemResponseMessages response) where T : ICommand
    {
      response = new SystemResponseMessages(ApplicationResponseMessagesEnum.NoAction, "");
      command.HandleCommand(out response);
    }

    public void PerformQuery<T>(T query) where T : IQuery
    {
      throw new NotImplementedException();
    }
  }
}
