using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MidnightLizard.Web.Portal.Infrastructure
{
  public class IRequest
  {
    public object cookies { get; set; }
    public object headers { get; set; }
    public object host { get; set; }
  }
}
