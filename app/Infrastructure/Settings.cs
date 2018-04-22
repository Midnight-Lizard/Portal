using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MidnightLizard.Web.Portal.Infrastructure
{
    public class Settings
    {
        public string ENV { get; set; }

        public string portalUrl { get; set; }
        public string PORTAL_URL { get => portalUrl; set => portalUrl = value; }

        public string schemesUrl { get; set; }
        public string SCHEMES_URL { get => schemesUrl; set => schemesUrl = value; }

        public string identityUrl { get; set; }
        public string IDENTITY_URL { get => identityUrl; set => identityUrl = value; }
    }
}
