using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using TournamentData;
using TournamentData.ApplicationTypes;
using TournamentData.Commands.EventsCommand;
using TournamentData.Context;
using TournamentData.DomainModels;
using TournamentData.Enums;
using TournamentData.Models;
using TournamentData.SystemMessages;

namespace Tournament.Controllers
{
  public class EventsController : ApiController
    {
      private readonly TournamentDbContext _context;
      private readonly ITournamentDomainClient _tournamentDomainClient;

      public EventsController(TournamentDbContext context, ITournamentDomainClient tournamentDomainClient)
      {
          _context = context;
          _tournamentDomainClient = tournamentDomainClient;
      }

      [System.Web.Http.HttpGet]
      [System.Web.Http.Route("api/events")]
      [System.Web.Http.AllowAnonymous]
      public IEnumerable<TournamentModel> getEvents()
      {
        return _context.Tournament.ToList();
      }

      [System.Web.Http.HttpPost]
      [System.Web.Http.Route("api/event/create")]
      [System.Web.Http.AllowAnonymous]
      public ActionResult CreateEvent(TournamentEvent tournamentEvent)
      {
          ISystemResponseMessages systemMessages = new SystemResponseMessages(ApplicationResponseMessagesEnum.NoAction, "");
          
          var command = new CreateEventCommand(tournamentEvent, _context);
          _tournamentDomainClient.PerformCommand(command, out systemMessages);

          if (systemMessages.MessageState().Equals(ApplicationResponseMessagesEnum.Success))
          {
            return new HttpStatusCodeResult(HttpStatusCode.OK);
          }

          return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Data not captured");
      }
  }
}
