using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.Enums;

namespace TournamentData.ApplicationTypes
{
  public interface ISystemResponseMessages
  {
    ApplicationResponseMessagesEnum MessageState();
    string Message();
  }
}
