using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.ApplicationTypes;

namespace TournamentData
{
  public interface ITournamentDomainClient
  {
    void PerformCommand<T>(T command, out ISystemResponseMessages response) where T : ICommand;
    void PerformQuery<T>(T query) where T : IQuery;
  }
}
