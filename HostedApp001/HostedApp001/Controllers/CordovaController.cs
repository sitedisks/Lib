using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HostedApp001.Controllers
{
    public class CordovaController : Controller
    {
        const string platformCookieKey = "cdva_platfrm";
        // GET: Cordova
        public ActionResult Index()
        {
            var cookie = HttpContext.Request.Cookies[platformCookieKey];    // android
            var platform = "dontknow";
            if (cookie != null)
            {
                platform = cookie.Value;
            }
            ViewBag.Platform = platform; // android
            return View();
        }

        public ActionResult setPlatformCookie(string platform)
        {
            if (!string.IsNullOrWhiteSpace(platform))
            {
                HttpContext.Response.SetCookie(new HttpCookie(platformCookieKey, platform));
            }
            return RedirectToAction("index");
        }
    }
}