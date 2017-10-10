using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MidnightLizard.Web.Portal.Controllers
{
    public class ReadyController : Controller
    {
        public IActionResult Index()
        {
            return Ok("Portal is ready.");
        }
    }
}