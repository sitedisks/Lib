namespace UnitOfWorkRepository.Controllers
{
    using Models.Entity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using UOW;

    public class GenericSurveysController : Controller
    {
        UnitOfWork uow = null;

        public GenericSurveysController() {
            uow = new UnitOfWork();
        }

        // GET: GenericSurveys
        public ActionResult Index()
        {
            //var list = uow.Repository<tbSurvey>().GetAll().ToList();
            var list = uow.Repository<tbSurvey>().Queryable().Where(x => !x.IsDeleted ?? false).ToList();
            return View(list);
        }
    }
}