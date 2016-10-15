namespace UnitOfWorkRepository.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using UnitOfWorkRepository.Models.Entity;
    using UnitOfWorkRepository.Repository;

    public class HomeController : Controller
    {
        private SurveysRepository repo = new SurveysRepository();

        // GET: Home
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            var list = repo.GetAll().ToList();
            return View(list);
        }

        public ActionResult Details(int id = 0) {
            tbSurvey survey = repo.Get(c => c.SurveyId == id);
            if (survey == null)
                return HttpNotFound();
            return View(survey);
        }
    }
}