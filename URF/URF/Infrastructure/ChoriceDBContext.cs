namespace URF.Infrastructure
{
    using Interface;
    using Models.Domain;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Core.Objects;
    using System.Data.Entity.Infrastructure;
    using System.Linq;
    using System.Web;

    public class ChoriceDBContext: DbContext, IChoriceDBContext
    {
        public ChoriceDBContext() : base("ChoriceDbContext") { }
        public ChoriceDBContext(string connectionString) : base(connectionString) { }
        public ObjectContext BaseContext
        {
            get { return ((IObjectContextAdapter)this).ObjectContext; }
        }

        #region entites
        public DbSet<tbSurvey> tbSurveys { get; set; }
        #endregion
    }
}