namespace UnitOfWorkRepository.UOW
{
    using DbContext;
    using Interface;
    using Repository;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public class UnitOfWork : IDisposable
    {
        private ChoriceDBContext db = null;

        public UnitOfWork()
        {
            db = new ChoriceDBContext();
        }

        public Dictionary<Type, object> repositories = new Dictionary<Type, object>();

        public IRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            if (repositories.Keys.Contains(typeof(TEntity)) == true)
            {
                return repositories[typeof(TEntity)] as IRepository<TEntity>;
            }

            IRepository<TEntity> repo = new GenericRepository<TEntity>(db);
            repositories.Add(typeof(TEntity), repo);
            return repo;
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