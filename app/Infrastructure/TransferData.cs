using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MidnightLizard.Web.Portal.Infrastructure
{
    public class TransferData
    {
        public dynamic request { get; set; }
        public Dictionary<string, object> user { get; set; }
        public Settings settings { get; set; } = new Settings();
    }
}
