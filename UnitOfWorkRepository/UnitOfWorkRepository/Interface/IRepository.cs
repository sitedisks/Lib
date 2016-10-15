namespace UnitOfWorkRepository.Interface
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    public interface IRepository<TEntity> where TEntity : class
    {
        //IQueryable<TEntity> GetAll();
        IEnumerable<TEntity> GetAll(Func<TEntity, bool> predicate = null);
        TEntity Get(Func<TEntity, bool> predicate); // parameter is TEntity, result value is bool
        void Add(TEntity entity);
        void Attach(TEntity entity);
        void Delete(TEntity entity);
    }
}
