using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UnitOfWorkRepository.DbContext;
using UnitOfWorkRepository.Interface;
using UnitOfWorkRepository.Models.Entity;
using UnitOfWorkRepository.Repository;

namespace UnitOfWorkRepository.UOW
{
    public class UnitOfWorkSurvey: IDisposable
    {
        private IChoriceDBContext db = null;

        public UnitOfWorkSurvey() {
            db = new ChoriceDBContext();
        }

        // Add all the repository handles here
        IRepository<tbSurvey> surveyRepo = null;

        // Add all the repository getters here
        public IRepository<tbSurvey> SurveyRepo {
            get {
                if (surveyRepo == null)
                    surveyRepo = new SurveysRepositoryWithUow(db);
                return surveyRepo;
            }
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }

        #region dispose
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion 
    }
}