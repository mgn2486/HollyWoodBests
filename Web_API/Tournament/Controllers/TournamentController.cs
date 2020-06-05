using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using TournamentData;
using TournamentData.ApplicationTypes;
using TournamentData.Commands.TournamentCommand;
using TournamentData.Context;
using TournamentData.Enums;
using TournamentData.Models;
using TournamentData.SystemMessages;

namespace Tournament.Controllers
{
    public class TournamentController : ApiController
    {
      private readonly TournamentDbContext _context;
      private readonly ITournamentDomainClient _tournamentDomainClient;
      public TournamentController(TournamentDbContext context, ITournamentDomainClient tournamentDomainClient)
      {
        _context = context;
        _tournamentDomainClient = tournamentDomainClient;
      }

      [System.Web.Http.HttpGet]
      [System.Web.Http.Route("api/tournaments")]
      [System.Web.Http.AllowAnonymous]
      public IEnumerable<TournamentModel> getTournaments()
      {
        return _context.Tournament.ToList();
      }

      [System.Web.Http.HttpPost]
      [System.Web.Http.Route("api/tournament/create")]
      [Authorize(Roles = "SuperAdmin")]
      public ActionResult CreateTournament(TournamentModel tournamentModel)
      {
        ISystemResponseMessages systemMessages = new SystemResponseMessages(ApplicationResponseMessagesEnum.NoAction, "");
        var tournament = new TournamentData.ApplicationModels.Tournament();
        tournament.Name = tournamentModel.Name;
        var command = new CreateTournamentCommand(tournament, _context);
        _tournamentDomainClient.PerformCommand(command, out systemMessages);

        if (systemMessages.MessageState().Equals(ApplicationResponseMessagesEnum.Success))
        {
          return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Data not captured");
      }

      [System.Web.Http.HttpDelete]
      [System.Web.Http.Route("api/tournament/delete/id")]
      [System.Web.Http.AllowAnonymous]
      public ActionResult DeleteTournament(int id)
      {
        ISystemResponseMessages systemMessages = new SystemResponseMessages(ApplicationResponseMessagesEnum.NoAction, "");
        
        var command = new DeleteTournamentCommand(id, _context);
        _tournamentDomainClient.PerformCommand(command, out systemMessages);

        if (systemMessages.MessageState().Equals(ApplicationResponseMessagesEnum.Success))
        {
          return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Data not captured");
      }
  }
}
