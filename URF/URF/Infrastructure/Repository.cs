namespace URF.Infrastructure
{
    using Interface;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Web;

    public class Repository<T>: IRepository<T> where T: class
    {
        private ChoriceDBContext context { get; set; }

        public Repository(ChoriceDBContext _context) {
            context = _context;
        }

        public void Create(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public T Read(Expression<Func<T, bool>> predicate)
        {
            return context.Set<T>().Where(predicate).FirstOrDefault();
        }

        public IQueryable<T> Reads()
        {
            return context.Set<T>().AsQueryable();
        }

        public void Update(T entity)
        {
            context.Entry<T>(entity).State = EntityState.Modified;
        }

        public void Update(T entity, Expression<Func<T, object>>[] updateProperties)
        {
            context.Configuration.ValidateOnSaveEnabled = false;

            context.Entry<T>(entity).State = EntityState.Unchanged;

            if (updateProperties != null)
            {
                foreach (var property in updateProperties)
                {
                    context.Entry<T>(entity).Property(property).IsModified = true;
                }
            }
        }

        public void Delete(T entity)
        {
            context.Entry<T>(entity).State = EntityState.Deleted;
        }

        public void SaveChanges()
        {
            context.SaveChanges();

 
            if (context.Configuration.ValidateOnSaveEnabled == false)
            {
                context.Configuration.ValidateOnSaveEnabled = true;
            }
        }
    }
}