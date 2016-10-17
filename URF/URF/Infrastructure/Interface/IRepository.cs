namespace URF.Infrastructure.Interface
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Text;
    using System.Threading.Tasks;

    public interface IRepository<T>
    {
        void Create(T entity);
        T Read(Expression<Func<T, bool>> predicate);
        IQueryable<T> Reads();
        void Update(T entity);
        void Update(T entity, Expression<Func<T, object>>[] updateProperties);
        void Delete(T entity);
        void SaveChanges();
    }
}
