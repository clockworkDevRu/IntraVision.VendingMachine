using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

namespace IntraVision.VendingMachine.Filters
{
    public class AuthorizeTokenAttribute : ActionFilterAttribute
    {

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string token = HttpContext.Current.Request.Params["token"];
            string masterToken = ConfigurationManager.AppSettings["AuthorizeToken"];

            if (token != masterToken)
            {
                filterContext.Result = new HttpStatusCodeResult(403);
            }

            base.OnActionExecuting(filterContext);
        }

    }
}