namespace UnitOfWorkRepository.Repository
{
    using DbContext;
    using Interface;
    using Models.Entity;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    public class SurveysRepositoryWithUow: IRepository<tbSurvey>
    {
        private IChoriceDBContext db = null;

        public SurveysRepositoryWithUow(IChoriceDBContext _db)
        {
            db = _db;
        }

        public IEnumerable<tbSurvey> GetAll(Func<tbSurvey, bool> predicate = null)
        {
            if (predicate != null)
            {
                return db.tbSurveys.Where(predicate);
            }
            return db.tbSurveys;
        }

        public tbSurvey Get(Func<tbSurvey, bool> predicate)
        {
            return db.tbSurveys.FirstOrDefault(predicate);
        }

        public void Add(tbSurvey entity)
        {
            db.tbSurveys.Add(entity);
        }

        public void Attach(tbSurvey entity)
        {
            db.tbSurveys.Attach(entity);
            db.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(tbSurvey entity)
        {
            db.tbSurveys.Remove(entity);
        }

        public IQueryable<tbSurvey> Queryable()
        {
            return db.tbSurveys.AsQueryable();
        }
    }
}