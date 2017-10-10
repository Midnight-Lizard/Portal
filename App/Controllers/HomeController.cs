using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MidnightLizard.Web.Portal.Infrastructure;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authentication.Cookies;
using IdentityModel.Client;
using Microsoft.Extensions.Logging;

namespace MidnightLizard.Web.Portal.Controllers
{
    //[Authorize]
    public class HomeController : Controller
    {
        protected readonly Settings settings;
        protected readonly ILogger<HomeController> logger;

        public HomeController(
            IConfiguration config,
            ILogger<HomeController> logger)
        {
            this.logger = logger;
            settings = new Settings();
            config.Bind(settings);
        }

        //[AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            ViewData["Settings"] = JsonConvert.SerializeObject(settings);
            try
            {
                if (Request.Path == "/signedout")
                {
                    return SignOut(
                        OpenIdConnectDefaults.AuthenticationScheme,
                        CookieAuthenticationDefaults.AuthenticationScheme);
                }
                else
                {
                    var result = await HttpContext.AuthenticateAsync();
                    if (!result.Succeeded && Request.Path != "/signedin" && !string.IsNullOrEmpty(
                        Request.Cookies[$"{CookieAuthenticationDefaults.CookiePrefix}Identity.Application"]))
                    {
                        await HttpContext.ChallengeAsync();
                    }
                    if (result.Succeeded)
                    {
                        var user = result.Properties.GetTokens()
                            .ToDictionary(x => x.Name, x => x.Value as object);
                        user.Add("profile", result.Principal.Claims
                            .ToDictionary(c => c.Type, c => c.Value));
                        user.Add("session_state", result.Properties.Items[".sessionState"]);
                        user.Add("expired", true);
                        ViewData["User"] = user;
                    }
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, ex.Message);
            }
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
