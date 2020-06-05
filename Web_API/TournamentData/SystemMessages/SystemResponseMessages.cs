using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TournamentData.ApplicationTypes;
using TournamentData.Enums;

namespace TournamentData.SystemMessages
{
  public class SystemResponseMessages : ISystemResponseMessages
  {
    public ApplicationResponseMessagesEnum _messageState;
    public string _message;
    public SystemResponseMessages(ApplicationResponseMessagesEnum messageType, string message)
    {
      _messageState = messageType;
      _message = message;
    }

    public string Message()
    {
      return _message;
    }

    public ApplicationResponseMessagesEnum MessageState()
    {
      return _messageState;
    }
  }
}
