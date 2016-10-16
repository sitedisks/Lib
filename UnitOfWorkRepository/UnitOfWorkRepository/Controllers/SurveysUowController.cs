namespace UnitOfWorkRepository.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using UOW;

    public class SurveysUowController : Controller
    {
        private UnitOfWorkSurvey uow = null;

        public SurveysUowController() {
            uow = new UnitOfWorkSurvey();
        }

        public SurveysUowController(UnitOfWorkSurvey _uow) {
            uow = _uow;
        }

        // GET: SurveysUow
        public ActionResult Index()
        {
            var list = uow.SurveyRepo.GetAll().ToList();
            return View(list);
        }
    }
}