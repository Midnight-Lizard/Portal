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
        protected readonly ILogger<HomeController> logger;
        private readonly IConfiguration config;
        private Dictionary<string, object> user;

        public HomeController(
            IConfiguration config,
            ILogger<HomeController> logger)
        {
            this.config = config;
            this.logger = logger;
        }

        //[AllowAnonymous]
        public async Task<IActionResult> Index()
        {
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
                        this.user = result.Properties.GetTokens()
                            .ToDictionary(x => x.Name, x => x.Value as object);
                        this.user.Add("profile", result.Principal.Claims
                            .ToDictionary(c => c.Type, c => c.Value));
                        this.user.Add("session_state", result.Properties.Items[".sessionState"]);
                        this.user.Add("expired", true);
                    }
                }
            }
            catch (Exception ex)
            {
                this.logger.LogError(ex, ex.Message);
            }
            await this.Prerendering();
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        private async Task Prerendering()
        {
            var prerenderResult = await Request.BuildPrerender(this.config, this.user);

            ViewData["SpaHtml"] = prerenderResult.Html; // our <app-root /> from Angular
            ViewData["Title"] = prerenderResult.Globals["title"]; // set our <title> from Angular
            ViewData["Styles"] = prerenderResult.Globals["styles"]; // put styles in the correct place
            ViewData["Scripts"] = prerenderResult.Globals["scripts"]; // scripts (that were in our header)
            ViewData["Meta"] = prerenderResult.Globals["meta"]; // set our <meta> SEO tags
            ViewData["Links"] = prerenderResult.Globals["links"]; // set our <link rel="canonical"> etc SEO tags
            ViewData["TransferData"] = prerenderResult.Globals["transferData"]; // our transfer data set to window.TRANSFER_CACHE = {};
        }
    }
}
