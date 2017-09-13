using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MidnightLizard.Web.Portal.Infrastructure;
using Newtonsoft.Json;

namespace MidnightLizard.Web.Portal.Controllers
{
    public class HomeController : Controller
    {
        protected readonly Settings settings;

        public HomeController(IConfiguration config)
        {
            settings = new Settings();
            config.Bind(settings);
        }

        public IActionResult Index()
        {
            ViewData["Settings"] = JsonConvert.SerializeObject(settings);
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
