namespace UnitOfWorkRepository.Repository
{
    using DbContext;
    using Interface;
    using Models.Entity;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;
    using System.Data.Entity;
    public class SurveysRepository : IRepository<tbSurvey>
    {
        private ChoriceDBContext db = new ChoriceDBContext();

        public IEnumerable<tbSurvey> GetAll(Func<tbSurvey, bool> predicate = null)
        {
            if (predicate != null)
            {
                return db.tbSurveys.Where(predicate);
            }
            return db.tbSurveys;
        }

        public tbSurvey Get(Func<tbSurvey, bool> predicate) {
            return db.tbSurveys.FirstOrDefault(predicate);
        }

        public void Add(tbSurvey entity) {
            db.tbSurveys.Add(entity);
        }

        public void Attach(tbSurvey entity)
        {
            db.tbSurveys.Attach(entity);
            // ?? EntityState.Modified
            //db.tbSurveys.ObjectState.Modified;
        }

        public void Delete(tbSurvey entity) {
            db.tbSurveys.Remove(entity);
        }

        internal void SaveChanges() {
            db.SaveChanges();
        }
    }
}