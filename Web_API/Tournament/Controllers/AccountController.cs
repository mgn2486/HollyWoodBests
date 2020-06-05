using System.Collections.Generic;
using System.Security.Claims;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Tournament.Models;

namespace Tournament.Controllers
{
  public class AccountController : ApiController
  {
    [Route("api/User/Register")]
    [HttpPost]
    [AllowAnonymous]
    public IdentityResult Register(AccountModel model)
    {
        if (model.Roles == null)
        {
            model.Roles = new [] { "Admin" };
        }

        var userStore = new UserStore<ApplicationUser>(new ApplicationDbContext());
        var manager = new UserManager<ApplicationUser>(userStore);
        var user = new ApplicationUser() { UserName = model.Email, Email = model.Email };
        user.FirstName = model.FirstName;
        user.LastName = model.LastName;
        user.Initials = model.Initials;

        manager.PasswordValidator = new PasswordValidator
        {
          RequiredLength = 3
        };

        IdentityResult result = manager.Create(user, model.Password);

        manager.AddToRoles(user.Id, model.Roles);

        return result;
    }

    [HttpGet]
    [Route("api/GetUserClaims")]
    public AccountModel GetUserClaims()
    {
        var identityClaims = (ClaimsIdentity)User.Identity;
        IEnumerable<Claim> claims = identityClaims.Claims;

        AccountModel model = new AccountModel()
        {
            UserName = identityClaims.FindFirst("Username").Value,
            Email = identityClaims.FindFirst("Email").Value,
            FirstName = identityClaims.FindFirst("FirstName").Value,
            LastName = identityClaims.FindFirst("LastName").Value,
            Initials = identityClaims.FindFirst("Initials").Value,
            LoggedOn = identityClaims.FindFirst("LoggedOn").Value
        };

        return model;
    }

    [HttpGet]
    [Authorize(Roles = "SuperAdmin")]
    [Route("api/ForSuperAdminRole")]
    public string ForAdminRole()
    {
        return "for admin role";
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [Route("api/ForAdminRole")]
    public string ForAuthorRole()
    {
        return "For Admin role";
    }

    [HttpGet]
    [Authorize(Roles = "Member")]
    [Route("api/ForMemberRole")]
    public string ForAuthorOrReader()
    {
        return "For Member role";
    }
  }
}
