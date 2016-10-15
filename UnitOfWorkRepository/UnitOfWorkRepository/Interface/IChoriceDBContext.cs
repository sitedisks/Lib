namespace UnitOfWorkRepository.Interface
{
    using Models.Entity;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Core.Objects;
    using System.Data.Entity.Infrastructure;
    using System.Threading.Tasks;

    public interface IChoriceDBContext: IDisposable
    {
        Database Database { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
        DbEntityEntry Entry(object entity);
        DbEntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
        ObjectContext BaseContext { get; }

        #region entities
        DbSet<tbSurvey> tbSurveys { get; set; }
        #endregion
    }
}
