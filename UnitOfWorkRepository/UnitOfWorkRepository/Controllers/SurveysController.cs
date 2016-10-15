namespace UnitOfWorkRepository.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity;
    using System.Linq;
    using System.Net;
    using System.Web;
    using System.Web.Mvc;
    using UnitOfWorkRepository.DbContext;
    using UnitOfWorkRepository.Models.Entity;
    public class SurveysController : Controller
    {
        private ChoriceDBContext db = new ChoriceDBContext();

        // GET: Surveys
        public ActionResult Index()
        {
            return View(db.tbSurveys.ToList());
        }

        // GET: Surveys/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbSurvey tbSurvey = db.tbSurveys.Find(id);
            if (tbSurvey == null)
            {
                return HttpNotFound();
            }
            return View(tbSurvey);
        }

        // GET: Surveys/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Surveys/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SurveyId,Title,Slug,URLToken,ShortDescription,LongDescription,UserId,ShowReport,BannerId,LogoId,CreatedDate,UpdatedDate,IsDeleted,IsActive")] tbSurvey tbSurvey)
        {
            if (ModelState.IsValid)
            {
                db.tbSurveys.Add(tbSurvey);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tbSurvey);
        }

        // GET: Surveys/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbSurvey tbSurvey = db.tbSurveys.Find(id);
            if (tbSurvey == null)
            {
                return HttpNotFound();
            }
            return View(tbSurvey);
        }

        // POST: Surveys/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SurveyId,Title,Slug,URLToken,ShortDescription,LongDescription,UserId,ShowReport,BannerId,LogoId,CreatedDate,UpdatedDate,IsDeleted,IsActive")] tbSurvey tbSurvey)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tbSurvey).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tbSurvey);
        }

        // GET: Surveys/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            tbSurvey tbSurvey = db.tbSurveys.Find(id);
            if (tbSurvey == null)
            {
                return HttpNotFound();
            }
            return View(tbSurvey);
        }

        // POST: Surveys/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            tbSurvey tbSurvey = db.tbSurveys.Find(id);
            db.tbSurveys.Remove(tbSurvey);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
