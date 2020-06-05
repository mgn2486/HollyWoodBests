using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TournamentData.ApplicationTypes
{
  public interface ICommand
  {
    void HandleCommand(out ISystemResponseMessages responseMessage);
  }
}
