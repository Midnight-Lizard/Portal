using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MidnightLizard.Web.Portal.Controllers
{
    public class StatusController : Controller
    {
        public IActionResult IsReady()
        {
            return Ok("schemes app is ready");
        }

        public IActionResult IsAlive()
        {
            return Ok("schemes app is alive");
        }
    }
}
