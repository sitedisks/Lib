namespace UnitOfWorkRepository.Repository
{
    using DbContext;
    using Interface;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Web;
    public class GenericRepository<TEntity>: IRepository<TEntity> where TEntity: class
    {
        private ChoriceDBContext db = null;
        private DbSet<TEntity> _dbSet;

        public GenericRepository(ChoriceDBContext _db) {
            db = _db;
            if (db != null)
                _dbSet = db.Set<TEntity>();
        }

        public IEnumerable<TEntity> GetAll(Func<TEntity, bool> predicate = null) {
            if (predicate != null)
                return _dbSet.Where(predicate);

            return _dbSet.AsEnumerable();
        }

        public TEntity Get(Func<TEntity, bool> predicate) {
            return _dbSet.First(predicate);
        }

        public void Add(TEntity entity) {
            _dbSet.Add(entity);
        }

        public void Attach(TEntity entity) {
            _dbSet.Attach(entity);
        }

        public void Delete(TEntity entity) {
            _dbSet.Remove(entity);
        }

        public IQueryable<TEntity> Queryable() {
            return _dbSet;
        }
    }
}