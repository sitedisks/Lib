using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UnitOfWorkRepository.Repository;

namespace UnitOfWorkRepository.Controllers
{
    public class HomeController : Controller
    {
        private SurveysRepository repo = new SurveysRepository();

        // GET: Home
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            var list = repo.GetAll().ToList();
            return View();
        }
    }
}